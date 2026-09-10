// ─── Step 1: Generate Keys and CSR ───────────────────────────────────────────
export const step1Snippets = [
  {
    language: 'Bash',
    code: `# Generate the EC private key
openssl ecparam -name prime256v1 -genkey -noout -out issuer.key

# Generate the CSR
openssl req -new -key issuer.key -out issuer.csr \\
  -subj "/CN=YOUR_ISSUER_NAME/O=YOUR_ORGANIZATION/C=YOUR_COUNTRY"

# Format the CSR for JSON embedding (escape newlines)
CSR_PAYLOAD=$(awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' issuer.csr)`
  },
  {
    language: 'Python',
    code: `from cryptography.hazmat.primitives import serialization, hashes
from cryptography.hazmat.primitives.asymmetric import ec
from cryptography import x509
from cryptography.x509.oid import NameOID

# Generate private key
private_key = ec.generate_private_key(ec.SECP256R1())
with open("issuer.key", "wb") as f:
    f.write(private_key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    ))

# Generate CSR
csr = x509.CertificateSigningRequestBuilder().subject_name(x509.Name([
    x509.NameAttribute(NameOID.COMMON_NAME, u"YOUR_ISSUER_NAME"),
    x509.NameAttribute(NameOID.ORGANIZATION_NAME, u"YOUR_ORGANIZATION"),
    x509.NameAttribute(NameOID.COUNTRY_NAME, u"YOUR_COUNTRY"),
])).sign(private_key, hashes.SHA256())

with open("issuer.csr", "wb") as f:
    f.write(csr.public_bytes(serialization.Encoding.PEM))

# Format CSR for JSON embedding
csr_payload = csr.public_bytes(serialization.Encoding.PEM).decode('utf-8').replace('\\r\\n', '\\n').replace('\\n', '')`
  },
  {
    language: 'Java',
    code: `import org.bouncycastle.asn1.x500.X500Name;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.operator.jcajce.JcaContentSignerBuilder;
import org.bouncycastle.pkcs.jcajce.JcaPKCS10CertificationRequestBuilder;
import org.bouncycastle.util.io.pem.*;
import java.io.*;
import java.security.*;
import java.security.spec.ECGenParameterSpec;

public class GenerateKeys {
    public static void main(String[] args) throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        KeyPairGenerator keyGen = KeyPairGenerator.getInstance("EC", "BC");
        keyGen.initialize(new ECGenParameterSpec("secp256r1"));
        KeyPair keyPair = keyGen.generateKeyPair();
        try (PemWriter writer = new PemWriter(new FileWriter("issuer.key"))) {
            writer.writeObject(new PemObject("PRIVATE KEY", keyPair.getPrivate().getEncoded()));
        }
        X500Name subject = new X500Name("CN=YOUR_ISSUER_NAME,O=YOUR_ORGANIZATION,C=YOUR_COUNTRY");
        var p10Builder = new JcaPKCS10CertificationRequestBuilder(subject, keyPair.getPublic());
        var signer = new JcaContentSignerBuilder("SHA256withECDSA").setProvider("BC").build(keyPair.getPrivate());
        var csr = p10Builder.build(signer);
        StringWriter csrWriter = new StringWriter();
        try (PemWriter writer = new PemWriter(csrWriter)) {
            writer.writeObject(new PemObject("CERTIFICATE REQUEST", csr.getEncoded()));
        }
        try (FileWriter fw = new FileWriter("issuer.csr")) { fw.write(csrWriter.toString()); }
        String csrPayload = csrWriter.toString().replace("\\r\\n", "\\n").replace("\\n", "");
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Security.Cryptography;
using System.IO;

// Generate private key
using var ecdsa = ECDsa.Create(ECCurve.NamedCurves.nistP256);
File.WriteAllText("issuer.key", ecdsa.ExportECPrivateKeyPem());

// Generate CSR
var request = new CertificateRequest(
    "CN=YOUR_ISSUER_NAME, O=YOUR_ORGANIZATION, C=YOUR_COUNTRY",
    ecdsa,
    HashAlgorithmName.SHA256);

string csrPem = request.CreateSigningRequestPem();
File.WriteAllText("issuer.csr", csrPem);

// Format CSR for JSON embedding
string csrPayload = csrPem.Replace("\\r\\n", "\\n").Replace("\\n", "");`
  }
]

// ─── Step 2: Enroll with EJBCA ───────────────────────────────────────────────
export const step2Snippets = [
  {
    language: 'Bash',
    code: `curl -k -X POST "YOUR_EJBCA_URL/ejbca/ejbca-rest-api/v1/certificate/pkcs10enroll" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json" \\
  --cert YOUR_EJBCA_ADMIN_CERT \\
  --key YOUR_EJBCA_ADMIN_KEY \\
  -d "{
    \\"certificate_request\\": \\"$CSR_PAYLOAD\\",
    \\"certificate_profile_name\\": \\"YOUR_CERT_PROFILE\\",
    \\"end_entity_profile_name\\": \\"YOUR_CERT_PROFILE\\",
    \\"certificate_authority_name\\": \\"YOUR_CA_NAME\\",
    \\"username\\": \\"YOUR_USERNAME\\",
    \\"password\\": \\"YOUR_PASSWORD\\",
    \\"response_format\\": \\"PKCS7\\"
  }" > response.json`
  },
  {
    language: 'Python',
    code: `import requests, json
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.serialization import pkcs12
from cryptography.hazmat.backends import default_backend

with open("issuer.csr", "r") as f:
    csr_pem = f.read()

# Extract cert and key from P12 for mTLS
p12_data = open("YOUR_EJBCA_ADMIN_P12", "rb").read()
key, cert, chain = pkcs12.load_key_and_certificates(p12_data, b"YOUR_P12_PASSWORD", default_backend())
with open("admin.crt", "wb") as f:
    f.write(cert.public_bytes(serialization.Encoding.PEM))
with open("admin.key", "wb") as f:
    f.write(key.private_bytes(
        encoding=serialization.Encoding.PEM,
        format=serialization.PrivateFormat.TraditionalOpenSSL,
        encryption_algorithm=serialization.NoEncryption()
    ))

payload = {
    "certificate_request": csr_pem,
    "certificate_profile_name": "YOUR_CERT_PROFILE",
    "end_entity_profile_name": "YOUR_CERT_PROFILE",
    "certificate_authority_name": "YOUR_CA_NAME",
    "username": "YOUR_USERNAME",
    "password": "YOUR_PASSWORD",
    "response_format": "PKCS7"
}

response = requests.post(
    "YOUR_EJBCA_URL/ejbca/ejbca-rest-api/v1/certificate/pkcs10enroll",
    json=payload, cert=("admin.crt", "admin.key"), verify=False
)
with open("response.json", "w") as f:
    json.dump(response.json(), f)`
  },
  {
    language: 'Java',
    code: `import javax.net.ssl.*;
import java.io.*;
import java.net.*;
import java.nio.file.*;
import java.security.*;

public class EnrollEjbca {
    public static void main(String[] args) throws Exception {
        String csrPem = Files.readString(Path.of("issuer.csr"));
        String payload = String.format("""
            {
              "certificate_request": "%s",
              "certificate_profile_name": "YOUR_CERT_PROFILE",
              "end_entity_profile_name": "YOUR_CERT_PROFILE",
              "certificate_authority_name": "YOUR_CA_NAME",
              "username": "YOUR_USERNAME",
              "password": "YOUR_PASSWORD",
              "response_format": "PKCS7"
            }
            """, csrPem.replace("\\n", "\\\\n"));

        KeyStore keyStore = KeyStore.getInstance("PKCS12");
        keyStore.load(new FileInputStream("YOUR_EJBCA_ADMIN_P12"), "YOUR_P12_PASSWORD".toCharArray());
        KeyManagerFactory kmf = KeyManagerFactory.getInstance(KeyManagerFactory.getDefaultAlgorithm());
        kmf.init(keyStore, "YOUR_P12_PASSWORD".toCharArray());
        SSLContext ctx = SSLContext.getInstance("TLS");
        ctx.init(kmf.getKeyManagers(), null, new SecureRandom());

        HttpsURLConnection conn = (HttpsURLConnection) new URL(
            "YOUR_EJBCA_URL/ejbca/ejbca-rest-api/v1/certificate/pkcs10enroll").openConnection();
        conn.setSSLSocketFactory(ctx.getSocketFactory());
        conn.setRequestMethod("POST");
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setDoOutput(true);
        conn.getOutputStream().write(payload.getBytes());
        Files.writeString(Path.of("response.json"), new String(conn.getInputStream().readAllBytes()));
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Text;
using System.Net.Http;
using System.Security.Cryptography.X509Certificates;
using System.IO;

string csrPem = File.ReadAllText("issuer.csr");
string payload = $$"""
{
  "certificate_request": "{{csrPem.Replace("\\n", "\\\\n")}}",
  "certificate_profile_name": "YOUR_CERT_PROFILE",
  "end_entity_profile_name": "YOUR_CERT_PROFILE",
  "certificate_authority_name": "YOUR_CA_NAME",
  "username": "YOUR_USERNAME",
  "password": "YOUR_PASSWORD",
  "response_format": "PKCS7"
}
""";

var handler = new HttpClientHandler();
var adminCert = new X509Certificate2("YOUR_EJBCA_ADMIN_P12", "YOUR_P12_PASSWORD");
handler.ClientCertificates.Add(adminCert);
var client = new HttpClient(handler);
var response = await client.PostAsync(
    "YOUR_EJBCA_URL/ejbca/ejbca-rest-api/v1/certificate/pkcs10enroll",
    new StringContent(payload, Encoding.UTF8, "application/json"));
File.WriteAllText("response.json", await response.Content.ReadAsStringAsync());`
  }
]

// ─── Step 2b: Extract certs from response ────────────────────────────────────
export const step2bSnippets = [
  {
    language: 'Bash',
    code: `jq -r '.certificate' response.json | base64 -d | \\
  openssl pkcs7 -inform DER -print_certs -outform PEM > issuer.pem

# Optionally save the serial number for reference
jq -r '.serial_number' response.json > serial.txt`
  },
  {
    language: 'Python',
    code: `import json, base64
from cryptography.hazmat.primitives import serialization
from cryptography.hazmat.primitives.serialization import pkcs7

with open("response.json") as f:
    data = json.load(f)

cert_bytes = base64.b64decode(data["certificate"])
certificates = pkcs7.load_der_pkcs7_certificates(cert_bytes)

with open("issuer.pem", "wb") as f:
    for cert in certificates:
        f.write(cert.public_bytes(serialization.Encoding.PEM))

with open("serial.txt", "w") as f:
    f.write(data["serial_number"])`
  },
  {
    language: 'Java',
    code: `import org.bouncycastle.cert.X509CertificateHolder;
import org.bouncycastle.cms.CMSSignedData;
import org.bouncycastle.util.Store;
import org.bouncycastle.util.io.pem.*;
import java.io.FileWriter;
import java.nio.file.*;
import java.util.Base64;
import java.util.regex.*;

public class ExtractCerts {
    public static void main(String[] args) throws Exception {
        String responseBody = Files.readString(Path.of("response.json"));
        Matcher m = Pattern.compile("\\"certificate\\":\\"([^\\"]+)\\"").matcher(responseBody);
        if (m.find()) {
            byte[] pkcs7Der = Base64.getDecoder().decode(m.group(1));
            CMSSignedData cms = new CMSSignedData(pkcs7Der);
            Store<X509CertificateHolder> certStore = cms.getCertificates();
            try (PemWriter writer = new PemWriter(new FileWriter("issuer.pem"))) {
                for (X509CertificateHolder cert : certStore.getMatches(null)) {
                    writer.writeObject(new PemObject("CERTIFICATE", cert.getEncoded()));
                }
            }
        }
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Text.RegularExpressions;
using System.Security.Cryptography.Pkcs;
using System.Security.Cryptography.X509Certificates;
using System.Text;

string responseBody = File.ReadAllText("response.json");
var match = Regex.Match(responseBody, "\\"certificate\\":\\"([^\\"]+)\\"");
if (match.Success) {
    byte[] pkcs7Der = Convert.FromBase64String(match.Groups[1].Value);
    var signedCms = new SignedCms();
    signedCms.Decode(pkcs7Der);
    var pemBuilder = new StringBuilder();
    foreach (var cert in signedCms.Certificates)
        pemBuilder.AppendLine(cert.ExportCertificatePem());
    File.WriteAllText("issuer.pem", pemBuilder.ToString());
}
var serialMatch = Regex.Match(responseBody, "\\"serial_number\\":\\"([^\\"]+)\\"");
if (serialMatch.Success)
    File.WriteAllText("serial.txt", serialMatch.Groups[1].Value);`
  }
]

// ─── Step 3: Register with Thiqa Hub ─────────────────────────────────────────
export const step3Snippets = [
  {
    language: 'Bash',
    code: `CERT_PEM=$(awk 'NF {sub(/\\r/, ""); printf "%s\\\\n",$0;}' issuer.pem)

curl -X POST "YOUR_HUB_URL/api/certs/enroll" \\
  -H "Content-Type: application/json" \\
  -d "{ \\"certPem\\": \\"$CERT_PEM\\" }"`
  },
  {
    language: 'Python',
    code: `import requests

with open("issuer.pem", "r") as f:
    cert_pem = "".join([line.strip() + "\\n" for line in f if line.strip()])

response = requests.post(
    "YOUR_HUB_URL/api/certs/enroll",
    json={"certPem": cert_pem}
)
print(response.status_code, response.json())`
  },
  {
    language: 'Java',
    code: `import java.net.http.*;
import java.net.URI;
import java.nio.file.*;

public class Enroll {
    public static void main(String[] args) throws Exception {
        String certPem = Files.readString(Path.of("issuer.pem"))
            .replaceAll("(?m)^\\\\s+$", "").replaceAll("\\\\r\\\\n?", "\\\\n");
        String json = "{\\"certPem\\":\\"" + certPem.replace("\\n", "\\\\n") + "\\"}";

        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("YOUR_HUB_URL/api/certs/enroll"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json))
            .build();
        System.out.println(client.send(request, HttpResponse.BodyHandlers.ofString()).body());
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Net.Http.Json;
using System.IO;
using System.Text.RegularExpressions;

var certPem = Regex.Replace(File.ReadAllText("issuer.pem"), @"(?m)^\\s+$[\\r\\n]*", "");
certPem = certPem.Replace("\\r", "");

using var client = new HttpClient();
var response = await client.PostAsJsonAsync("YOUR_HUB_URL/api/certs/enroll", new { certPem });
Console.WriteLine(await response.Content.ReadAsStringAsync());`
  }
]

// ─── Step 4.1: Generate Doc ID ───────────────────────────────────────────────
export const step4aSnippets = [
  { language: 'Bash', code: `DOC_ID=$(uuidgen)` },
  {
    language: 'Python',
    code: `import uuid
doc_id = str(uuid.uuid4())
print(f"Document ID: {doc_id}")
# Stamp a QR code containing doc_id onto your PDF before proceeding.`
  },
  {
    language: 'Java',
    code: `import java.util.UUID;
public class GenerateDocId {
    public static void main(String[] args) {
        UUID docId = UUID.randomUUID();
        System.out.println("Document ID: " + docId);
        // Stamp a QR code containing docId onto your PDF before proceeding.
    }
}`
  },
  {
    language: 'C#',
    code: `string docId = Guid.NewGuid().ToString();
Console.WriteLine($"Document ID: {docId}");
// Stamp a QR code containing docId onto your PDF before proceeding.`
  }
]

// ─── Step 4.2: Hash and register ─────────────────────────────────────────────
export const step4bSnippets = [
  {
    language: 'Bash',
    code: `DOC_HASH=$(sha256sum document.pdf | awk '{print $1}')
RENDERING_B64=$(base64 -w 0 document.pdf)

jq -n \\
  --arg docId "$DOC_ID" \\
  --arg docHash "$DOC_HASH" \\
  --arg renderingBase64 "$RENDERING_B64" \\
  '{
    docId: $docId,
    docHash: $docHash,
    hashAlgorithm: "SHA-256",
    renderingBase64: $renderingBase64,
    minRequiredSignatures: 1
  }' > initiate_payload.json

curl -X POST "YOUR_HUB_URL/api/documents/initiate" \\
  -H "Content-Type: application/json" \\
  -d @initiate_payload.json`
  },
  {
    language: 'Python',
    code: `import hashlib, base64, uuid, requests

with open("document.pdf", "rb") as f:
    doc_bytes = f.read()

doc_hash = hashlib.sha256(doc_bytes).hexdigest()
rendering_b64 = base64.b64encode(doc_bytes).decode("utf-8")

payload = {
    "docId": str(uuid.uuid4()),
    "docHash": doc_hash,
    "hashAlgorithm": "SHA-256",
    "renderingBase64": rendering_b64,
    "minRequiredSignatures": 1
}
response = requests.post("YOUR_HUB_URL/api/documents/initiate", json=payload)
print(response.json())`
  },
  {
    language: 'Java',
    code: `import java.nio.file.*;
import java.security.MessageDigest;
import java.util.*;
import java.net.http.*;
import java.net.URI;

public class InitiateDocument {
    public static void main(String[] args) throws Exception {
        byte[] docBytes = Files.readAllBytes(Path.of("document.pdf"));
        byte[] hash = MessageDigest.getInstance("SHA-256").digest(docBytes);
        StringBuilder sb = new StringBuilder();
        for (byte b : hash) sb.append(String.format("%02x", b));
        String docHash = sb.toString();
        String renderingB64 = Base64.getEncoder().encodeToString(docBytes);
        String docId = UUID.randomUUID().toString();
        String json = String.format("""
            {"docId":"%s","docHash":"%s","hashAlgorithm":"SHA-256","renderingBase64":"%s","minRequiredSignatures":1}
            """, docId, docHash, renderingB64);
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("YOUR_HUB_URL/api/documents/initiate"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json)).build();
        System.out.println(client.send(request, HttpResponse.BodyHandlers.ofString()).body());
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Security.Cryptography;
using System.Text;
using System.Text.Json;

byte[] docBytes = await File.ReadAllBytesAsync("document.pdf");
string docHash = Convert.ToHexString(SHA256.HashData(docBytes)).ToLower();
string renderingB64 = Convert.ToBase64String(docBytes);

var payload = new { docId = Guid.NewGuid().ToString(), docHash, hashAlgorithm = "SHA-256", renderingBase64 = renderingB64, minRequiredSignatures = 1 };
var client = new HttpClient();
var response = await client.PostAsync(
    "YOUR_HUB_URL/api/documents/initiate",
    new StringContent(JsonSerializer.Serialize(payload), Encoding.UTF8, "application/json"));
Console.WriteLine(await response.Content.ReadAsStringAsync());`
  }
]

// ─── Step 5.1: Sign ──────────────────────────────────────────────────────────
export const step5aSnippets = [
  {
    language: 'Bash',
    code: `# Convert hex hash to 32 binary bytes
echo -n "$DOC_HASH" | xxd -r -p > hash.bin

# Sign with CAdES-BES (-binary flag is MANDATORY)
openssl cms -sign -in hash.bin -outform DER -out signature.der \\
  -signer issuer.pem -inkey issuer.key -nodetach -md sha256 -cades -binary`
  },
  {
    language: 'Python',
    code: `from endesive.cms import sign
from cryptography.hazmat.primitives import serialization
from cryptography import x509
from cryptography.hazmat.backends import default_backend

with open("issuer.key", "rb") as f:
    key = serialization.load_pem_private_key(f.read(), password=None, backend=default_backend())

with open("issuer.pem", "rb") as f:
    pem_data = f.read()

certs = [x509.load_pem_x509_certificate(c + b'-----END CERTIFICATE-----\\n', default_backend())
         for c in pem_data.split(b'-----END CERTIFICATE-----') if c.strip()]

hash_bin = bytes.fromhex(doc_hash)
sig = sign(hash_bin, key, certs[0], certs[1:], "sha256", attrs=True)

with open("signature.der", "wb") as f:
    f.write(sig)`
  },
  {
    language: 'Java',
    code: `// Uses BouncyCastle. Full CAdES-BES implementation with SigningCertificateV2 attribute.
import org.bouncycastle.cms.*;
import org.bouncycastle.cms.jcajce.JcaSignerInfoGeneratorBuilder;
import org.bouncycastle.cert.jcajce.JcaCertStore;
import org.bouncycastle.operator.jcajce.*;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import java.security.*;
import java.nio.file.*;
import java.util.*;

public class SignHash {
    public static void main(String[] args) throws Exception {
        Security.addProvider(new BouncyCastleProvider());
        String docHash = "..."; // From Step 4.2
        byte[] hashBin = hexToBytes(docHash);
        // Load key and certs from issuer.key / issuer.pem...
        CMSSignedDataGenerator gen = new CMSSignedDataGenerator();
        // Add signer + CAdES-BES SigningCertificateV2 attribute...
        CMSSignedData sigData = gen.generate(new CMSProcessableByteArray(hashBin), true);
        Files.write(Path.of("signature.der"), sigData.getEncoded());
    }
    static byte[] hexToBytes(String hex) {
        byte[] b = new byte[hex.length() / 2];
        for (int i = 0; i < b.length; i++) b[i] = (byte) Integer.parseInt(hex.substring(i * 2, i * 2 + 2), 16);
        return b;
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Security.Cryptography;
using System.Security.Cryptography.Pkcs;
using System.Security.Cryptography.X509Certificates;
using System.Formats.Asn1;

byte[] hashBin = Enumerable.Range(0, docHash.Length / 2)
    .Select(x => Convert.ToByte(docHash.Substring(x * 2, 2), 16)).ToArray();

using var ecdsa = ECDsa.Create();
ecdsa.ImportFromPem(File.ReadAllText("issuer.key"));

var certs = new X509Certificate2Collection();
certs.ImportFromPem(File.ReadAllText("issuer.pem"));
var leafCert = certs[0];
var certWithKey = leafCert.CopyWithPrivateKey(ecdsa);

// Build CAdES-BES SigningCertificateV2 attribute
byte[] certHash = SHA256.HashData(leafCert.RawData);
var writer = new AsnWriter(AsnEncodingRules.DER);
writer.PushSequence(); writer.PushSequence(); writer.PushSequence();
writer.WriteOctetString(certHash);
writer.PopSequence(); writer.PopSequence(); writer.PopSequence();
var signingCertAttr = new Pkcs9AttributeObject("1.2.840.113549.1.9.16.2.47", writer.Encode());

var signedCms = new SignedCms(new ContentInfo(hashBin), detached: false);
var signer = new CmsSigner(SubjectIdentifierType.IssuerAndSerialNumber, certWithKey);
signer.SignedAttributes.Add(signingCertAttr);
foreach (var cert in certs) signer.Certificates.Add(cert);
signedCms.ComputeSignature(signer);
File.WriteAllBytes("signature.der", signedCms.Encode());`
  }
]

// ─── Step 5.2: Submit signature ───────────────────────────────────────────────
export const step5bSnippets = [
  {
    language: 'Bash',
    code: `SIG_B64=$(base64 -w 0 signature.der)

curl -X POST "YOUR_HUB_URL/api/documents/$DOC_ID/signatures" \\
  -H "Content-Type: application/json" \\
  -d "{ \\"cadesSignatureBase64\\": \\"$SIG_B64\\" }"`
  },
  {
    language: 'Python',
    code: `import requests, base64

with open("signature.der", "rb") as f:
    sig_b64 = base64.b64encode(f.read()).decode("utf-8")

response = requests.post(
    f"YOUR_HUB_URL/api/documents/{doc_id}/signatures",
    json={"cadesSignatureBase64": sig_b64}
)
print(response.json())`
  },
  {
    language: 'Java',
    code: `import java.nio.file.*;
import java.util.Base64;
import java.net.http.*;
import java.net.URI;

public class SubmitSignature {
    public static void main(String[] args) throws Exception {
        String sigB64 = Base64.getEncoder().encodeToString(Files.readAllBytes(Path.of("signature.der")));
        String json = "{\\"cadesSignatureBase64\\":\\"" + sigB64 + "\\"}";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("YOUR_HUB_URL/api/documents/" + docId + "/signatures"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json)).build();
        System.out.println(client.send(request, HttpResponse.BodyHandlers.ofString()).body());
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Net.Http;

string sigB64 = Convert.ToBase64String(await File.ReadAllBytesAsync("signature.der"));
using var client = new HttpClient();
var response = await client.PostAsJsonAsync(
    $"YOUR_HUB_URL/api/documents/{docId}/signatures",
    new { cadesSignatureBase64 = sigB64 });
Console.WriteLine(await response.Content.ReadAsStringAsync());`
  }
]

// ─── Step 6: Revoke ───────────────────────────────────────────────────────────
export const step6Snippets = [
  {
    language: 'Bash',
    code: `curl -X POST "YOUR_HUB_URL/api/documents/$DOC_ID/revoke" \\
  -H "Content-Type: application/json" \\
  -d '{
    "reason": "Administrative cancellation",
    "revokedBy": "YOUR_ISSUER_NAME"
  }'`
  },
  {
    language: 'Python',
    code: `import requests

response = requests.post(
    f"YOUR_HUB_URL/api/documents/{doc_id}/revoke",
    json={"reason": "Administrative cancellation", "revokedBy": "YOUR_ISSUER_NAME"}
)
print(response.json())`
  },
  {
    language: 'Java',
    code: `import java.net.http.*;
import java.net.URI;

public class RevokeDocument {
    public static void main(String[] args) throws Exception {
        String docId = "YOUR_DOC_ID";
        String json = """
            {"reason":"Administrative cancellation","revokedBy":"YOUR_ISSUER_NAME"}
            """;
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("YOUR_HUB_URL/api/documents/" + docId + "/revoke"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json)).build();
        System.out.println(client.send(request, HttpResponse.BodyHandlers.ofString()).body());
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Net.Http;
using System.Text.Json;

string docId = "YOUR_DOC_ID";
var payload = new { reason = "Administrative cancellation", revokedBy = "YOUR_ISSUER_NAME" };
using var client = new HttpClient();
var response = await client.PostAsync(
    $"YOUR_HUB_URL/api/documents/{docId}/revoke",
    new StringContent(JsonSerializer.Serialize(payload), System.Text.Encoding.UTF8, "application/json"));
Console.WriteLine(await response.Content.ReadAsStringAsync());`
  }
]

// ─── Step 7: Verify ───────────────────────────────────────────────────────────
export const step7Snippets = [
  {
    language: 'Bash',
    code: `curl -X POST "YOUR_HUB_URL/api/documents/verify" \\
  -H "Content-Type: application/json" \\
  -d "{ \\"docId\\": \\"$DOC_ID\\" }"`
  },
  {
    language: 'Python',
    code: `import requests

response = requests.post(
    "YOUR_HUB_URL/api/documents/verify",
    json={"docId": doc_id}
)
print(response.json())`
  },
  {
    language: 'Java',
    code: `import java.net.http.*;
import java.net.URI;

public class VerifyDocument {
    public static void main(String[] args) throws Exception {
        String json = "{\\"docId\\":\\"YOUR_DOC_ID\\"}";
        HttpClient client = HttpClient.newHttpClient();
        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("YOUR_HUB_URL/api/documents/verify"))
            .header("Content-Type", "application/json")
            .POST(HttpRequest.BodyPublishers.ofString(json)).build();
url = "YOUR_HUB_URL/api/documents/verify"
payload = { "docId": doc_id }
headers = {'Content-Type': 'application/json'}

response = requests.post(url, json=payload, headers=headers)
print("Verification Result:", json.dumps(response.json(), indent=2))`
  }
]

