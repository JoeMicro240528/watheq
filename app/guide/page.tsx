import { ShieldCheck, BookOpen, Key, FileCheck, Info, AlertTriangle, Terminal, Download, UserPlus, FilePlus, PenTool, CheckCircle, XCircle, FileText, Database } from 'lucide-react'
import { CodeBlock } from '@/components/ui/code-block'

export const metadata = {
  title: 'دليل ربط المصدرين | ثقة',
  description: 'دليل ربط المصدرين لتسجيل الشهادات وتوقيع الوثائق في منصة ثقة',
}

// ─── Step 1: Generate Keys and CSR ───────────────────────────────────────────
const step1Snippets = [
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
const step2Snippets = [
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
const step2bSnippets = [
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
const step3Snippets = [
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
const step4aSnippets = [
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
const step4bSnippets = [
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
const step5aSnippets = [
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
const step5bSnippets = [
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
const step6Snippets = [
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
const step7Snippets = [
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
        System.out.println(client.send(request, HttpResponse.BodyHandlers.ofString()).body());
    }
}`
  },
  {
    language: 'C#',
    code: `using System.Net.Http.Json;

using var client = new HttpClient();
var response = await client.PostAsJsonAsync("YOUR_HUB_URL/api/documents/verify", new { docId });
Console.WriteLine(await response.Content.ReadAsStringAsync());`
  }
]

// ─── Reusable UI Components ───────────────────────────────────────────────────
function Callout({ type, children }: { type: 'info' | 'warning' | 'tip', children: React.ReactNode }) {
  const styles = {
    info: 'border-blue-500/30 bg-blue-500/5 text-blue-700 dark:text-blue-400',
    warning: 'border-amber-500/30 bg-amber-500/5 text-amber-700 dark:text-amber-400',
    tip: 'border-accent/30 bg-accent/5 text-accent',
  }
  const icons = {
    info: <Info className="size-4 shrink-0 mt-0.5" />,
    warning: <AlertTriangle className="size-4 shrink-0 mt-0.5" />,
    tip: <Terminal className="size-4 shrink-0 mt-0.5" />,
  }
  return (
    <div className={`my-6 flex items-start gap-4 rounded-xl border p-4 ${styles[type]}`}>
      {icons[type]}
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  )
}

function StepSection({ id, number, icon: Icon, title, children }: { id: string, number: string, icon: React.ElementType, title: string, children: React.ReactNode }) {
  return (
    <section id={id} className="scroll-mt-28">
      <div className="mb-6 flex items-center gap-4">
        <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
          <Icon className="size-6" />
        </div>
        <div>
          <div className="text-xs font-bold text-muted-foreground">الخطوة {number}</div>
          <h2 className="text-2xl font-black text-primary">{title}</h2>
        </div>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}

export default function GuidePage() {
  return (
    <div dir="rtl" className="min-h-screen bg-background text-foreground selection:bg-accent/30">
      <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/80 px-6 py-4 backdrop-blur-md lg:px-10">
        <div className="mx-auto flex max-w-7xl items-center justify-between">
          <a href="/" className="flex items-center" aria-label="ثقة - الصفحة الرئيسية">
            <img src="/icon.png" alt="شعار ثقة" className="h-20 w-auto object-contain" />
          </a>
          <div className="flex items-center gap-4">
            <a href="/flow" className="inline-flex rounded-full bg-accent/10 px-3 py-1.5 text-xs font-semibold text-accent transition-colors hover:bg-accent/20 sm:px-4 sm:text-sm">
              مخطط التكامل
            </a>
            <span className="hidden rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-primary sm:inline-block">
              مركز المطورين
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-7xl flex-col items-start gap-10 px-6 py-10 lg:flex-row lg:gap-16 lg:px-10 lg:py-16">

        {/* Sidebar Navigation */}
        <aside className="sticky top-28 hidden w-64 shrink-0 lg:block">
          <div className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">محتويات الدليل</div>
          <nav className="flex flex-col gap-1.5 text-sm font-medium">
            <a href="#intro" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">المقدمة والأهداف</a>
            <a href="#prerequisites" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">المتطلبات الأساسية</a>
            <a href="#step-1" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">١. إنشاء المفاتيح وCSR</a>
            <a href="#step-2" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">٢. التسجيل في EJBCA</a>
            <a href="#step-3" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">٣. التسجيل في منصة ثقة</a>
            <a href="#step-4" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">٤. بدء وثيقة جديدة</a>
            <a href="#step-5" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">٥. توقيع الوثيقة</a>
            <a href="#step-6" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">٦. إلغاء الوثيقة</a>
            <a href="#step-7" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">٧. التحقق من الوثيقة</a>
            <a href="#reference" className="rounded-lg px-3 py-2 text-foreground transition-colors hover:bg-secondary">المرجع السريع</a>
          </nav>
          <a href="/public/ejbca-issuer-cli.zip" download className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-bold text-primary-foreground transition-all hover:bg-primary/90">
            <Download className="size-4" />
            تحميل CLI Scripts
          </a>
        </aside>

        {/* Main Content */}
        <main className="min-w-0 flex-1 space-y-16">

          {/* Intro */}
          <section id="intro" className="scroll-mt-28">
            <div className="mb-6 flex items-center gap-4">
              <div className="grid size-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary to-accent text-white shadow-lg">
                <BookOpen className="size-6" />
              </div>
              <h1 className="text-3xl font-black text-primary">دليل ربط المصدرين — Thiqa Issuer Integration Guide</h1>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              يشرح هذا الدليل دورة حياة المصدر بالكامل: توليد مفاتيح التشفير، الحصول على شهادة من EJBCA، التسجيل في منصة ثقة، بدء وثيقة، توقيعها، وإلغائها أو التحقق منها عند الحاجة.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-sm font-bold text-muted-foreground">ما ستنجزه في هذا الدليل:</p>
              <ul className="space-y-2 text-sm text-foreground">
                {[
                  'توليد زوج مفاتيح تشفير EC وطلب توقيع شهادة (CSR)',
                  'الحصول على شهادة من EJBCA عبر REST API',
                  'التسجيل كمصدر معتمد في منصة ثقة',
                  'بدء وثيقة وحساب بصمتها الرقمية (Hash)',
                  'توقيع الوثيقة بـ CAdES-BES وإرسال التوقيع',
                  'إلغاء وثيقة أو التحقق من صحتها'
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-accent/10 text-[10px] font-black text-accent">{i + 1}</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Prerequisites */}
          <section id="prerequisites" className="scroll-mt-28">
            <h2 className="mb-6 text-2xl font-black text-primary">المتطلبات الأساسية</h2>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-right font-bold text-primary">المتطلب</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">التفاصيل</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['OpenSSL 1.1.1+', 'مطلوب للتوقيع بـ CAdES-BES (الراية -cades). تحقق بـ openssl version'],
                    ['jq', 'لبناء وتحليل JSON بأمان. ثبّته عبر مدير الحزم'],
                    ['curl', 'لجميع طلبات API'],
                    ['بيانات EJBCA Admin', 'شهادة عميل ومفتاح خاص للمصادقة (mTLS) على EJBCA REST API'],
                    ['أسماء Profile في EJBCA', 'اسم Certificate Profile واسم End Entity Profile واسم CA'],
                    ['الوصول للشبكة', 'اتصال بـ EJBCA (منفذ 8443) ومنصة ثقة (منفذ 8081)'],
                  ].map(([req, detail], i) => (
                    <tr key={i} className="bg-card">
                      <td className="px-4 py-3 font-mono text-xs text-primary">{req}</td>
                      <td className="px-4 py-3 text-muted-foreground">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 rounded-xl border border-border bg-card p-5">
              <p className="mb-3 text-sm font-bold text-muted-foreground">عناوين الخدمات (Base URLs)</p>
              <table className="w-full text-sm">
                <thead><tr>
                  <th className="py-2 text-right font-bold text-primary">الخدمة</th>
                  <th className="py-2 text-right font-bold text-primary">القيمة الافتراضية</th>
                  <th className="py-2 text-right font-bold text-primary">مثال</th>
                </tr></thead>
                <tbody className="divide-y divide-border">
                  <tr><td className="py-2 font-mono text-xs text-primary">EJBCA REST API</td><td className="py-2 text-muted-foreground">YOUR_EJBCA_URL</td><td className="py-2 font-mono text-xs text-muted-foreground">https://ejbca.example.com:8443</td></tr>
                  <tr><td className="py-2 font-mono text-xs text-primary">Thiqa Hub API</td><td className="py-2 text-muted-foreground">YOUR_HUB_URL</td><td className="py-2 font-mono text-xs text-muted-foreground">http://hub.example.com:8081</td></tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Step 1 */}
          <StepSection id="step-1" number="١" icon={Key} title="إنشاء المفاتيح وطلب التوقيع (CSR)">
            <p className="leading-relaxed text-muted-foreground">
              أنشئ زوج مفاتيح Elliptic Curve (EC) على منحنى P-256 وطلب توقيع الشهادة (CSR).
            </p>
            <CodeBlock snippets={step1Snippets} />
            <Callout type="info">
              استبدل <code>YOUR_ISSUER_NAME</code> باسم المصدر (مثل: Ministry of Health)، و<code>YOUR_ORGANIZATION</code> باسم المنظمة، و<code>YOUR_COUNTRY</code> برمز الدولة المكون من حرفين (مثل: SD).
            </Callout>
            <div className="rounded-xl border border-border bg-card p-5 text-sm">
              <p className="mb-2 font-bold text-muted-foreground">ملفات الإخراج:</p>
              <ul className="space-y-1 text-muted-foreground">
                <li><code className="font-mono text-primary">issuer.key</code> — مفتاحك الخاص. احتفظ به بأمان ولا تشاركه.</li>
                <li><code className="font-mono text-primary">issuer.csr</code> — طلب التوقيع المُرسَل إلى EJBCA.</li>
              </ul>
            </div>
          </StepSection>

          {/* Step 2 */}
          <StepSection id="step-2" number="٢" icon={ShieldCheck} title="التسجيل في EJBCA">
            <p className="leading-relaxed text-muted-foreground">
              أرسل الـ CSR إلى EJBCA REST API للحصول على شهادة موقّعة وسلسلة CA الخاصة بها.
            </p>
            <CodeBlock snippets={step2Snippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 200 OK):</p>
              <CodeBlock code={`{
  "certificate": "MIIHJzCCBQ...",
  "serial_number": "72CA..."
}`} language="json" />
            </div>

            <h3 className="mt-8 text-lg font-bold text-primary">٢.ب — استخراج سلسلة الشهادات</h3>
            <p className="leading-relaxed text-muted-foreground">يعيد EJBCA حاوية PKCS7. استخرج شهادات X.509 الفردية كـ PEM:</p>
            <CodeBlock snippets={step2bSnippets} />

            <Callout type="tip">
              <strong>بديل:</strong> إذا سجّلت عبر واجهة ويب EJBCA وحمّلت ملف P12، استخرج المفتاح والشهادة بـ:<br />
              <code className="font-mono text-xs">openssl pkcs12 -in issuer.p12 -nocerts -out issuer.key -nodes</code><br />
              <code className="font-mono text-xs">openssl pkcs12 -in issuer.p12 -clcerts -nokeys -out issuer.pem</code>
            </Callout>
          </StepSection>

          {/* Step 3 */}
          <StepSection id="step-3" number="٣" icon={UserPlus} title="التسجيل في منصة ثقة">
            <p className="leading-relaxed text-muted-foreground">
              أرسل سلسلة الشهادات المستخرجة إلى منصة ثقة. ستقوم المنصة بالتحقق من السلسلة مقابل الجذر الحكومي، والتحقق من حالة OCSP، وتسجيلك كموقع معتمد.
            </p>
            <CodeBlock snippets={step3Snippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 201 Created):</p>
              <CodeBlock code={`{
  "issuerId": 1,
  "serial": "abc123...",
  "validFrom": "2026-01-01T00:00:00Z",
  "validUntil": "2027-01-01T00:00:00Z"
}`} language="json" />
            </div>
            <Callout type="warning">
              يجب أن يحتوي حقل <code>certPem</code> على سلسلة الشهادات الكاملة (الشهادة الرئيسية + شهادات CA الوسيطة). إرسال الشهادة الرئيسية فقط سيتسبب في خطأ التحقق من السلسلة.
            </Callout>
          </StepSection>

          {/* Step 4 */}
          <StepSection id="step-4" number="٤" icon={FilePlus} title="بدء وثيقة جديدة">
            <p className="leading-relaxed text-muted-foreground">
              أنشئ معرفاً فريداً للوثيقة، واطبع QR code يحتوي عليه على الوثيقة، ثم احسب الـ Hash وسجّل الوثيقة في المنصة.
            </p>

            <h3 className="mt-4 text-lg font-bold text-primary">٤.١ — توليد معرف الوثيقة وطباعة QR Code</h3>
            <CodeBlock snippets={step4aSnippets} />
            <Callout type="warning">
              اطبع QR code يحتوي على معرف الوثيقة (<code>$DOC_ID</code>) على ملف PDF <strong>قبل</strong> المتابعة. يجب تضمين الـ QR في الوثيقة في هذه المرحلة لأن الـ Hash يُحسب على المحتوى النهائي للوثيقة.
            </Callout>

            <h3 className="mt-6 text-lg font-bold text-primary">٤.٢ — حساب الـ Hash وتسجيل الوثيقة</h3>
            <CodeBlock snippets={step4bSnippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 201 Created):</p>
              <CodeBlock code={`{ "docId": "550e8400-e29b-41d4-a716-446655440000" }`} language="json" />
            </div>
          </StepSection>

          {/* Step 5 */}
          <StepSection id="step-5" number="٥" icon={PenTool} title="توقيع الوثيقة (CAdES-BES)">
            <p className="leading-relaxed text-muted-foreground">
              وقّع الـ Hash باستخدام توقيع CAdES-BES وأرسله إلى منصة ثقة.
            </p>

            <h3 className="mt-4 text-lg font-bold text-primary">٥.١ — تحويل الـ Hash وتوقيعه</h3>
            <CodeBlock snippets={step5aSnippets} />
            <Callout type="warning">
              الراية <code>-binary</code> إلزامية. بدونها، يقطع OpenSSL صامتاً المدخل عند البايتات الصفرية (null bytes)، مما ينتج توقيعاً سترفضه المنصة بخطأ عدم تطابق الـ Hash.
            </Callout>

            <h3 className="mt-6 text-lg font-bold text-primary">٥.٢ — إرسال التوقيع</h3>
            <CodeBlock snippets={step5bSnippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 201 Created):</p>
              <CodeBlock code={`{
  "signatureId": "660e8400-e29b-41d4-a716-446655440001",
  "status": "VALID"
}`} language="json" />
            </div>
            <Callout type="info">
              سيكون <code>status</code> إما <code>VALID</code> إذا اكتمل النصاب المطلوب، أو <code>PENDING_SIGNATURES</code> إذا كانت هناك توقيعات إضافية مطلوبة.
            </Callout>
          </StepSection>

          {/* Step 6 */}
          <StepSection id="step-6" number="٦" icon={XCircle} title="إلغاء وثيقة">
            <p className="leading-relaxed text-muted-foreground">
              لإلغاء وثيقة، استدعِ نقطة نهاية الإلغاء. الإلغاء دائم — يجب إنشاء وثيقة مصححة كسجل جديد.
            </p>
            <CodeBlock snippets={step6Snippets} />
            <div className="rounded-xl border border-border bg-card p-5 mt-4">
              <p className="mb-2 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 200 OK):</p>
              <CodeBlock code={`{ "revoked": true }`} language="json" />
            </div>
          </StepSection>

          {/* Step 7 */}
          <StepSection id="step-7" number="٧" icon={CheckCircle} title="التحقق من الوثيقة">
            <p className="leading-relaxed text-muted-foreground">
              بعد التوقيع، يمكنك التحقق من صلاحية الوثيقة في أي وقت. تُعيد المنصة التحقق من جميع التوقيعات وتُرجع الحالة الراهنة.
            </p>
            <CodeBlock snippets={step7Snippets} />
            <div className="rounded-xl border border-border bg-card p-5">
              <p className="mb-2 text-sm font-bold text-muted-foreground">الاستجابة المتوقعة (HTTP 200 OK):</p>
              <CodeBlock code={`{
  "valid": true,
  "docHash": "a1b2c3d4...",
  "hashAlgorithm": "SHA-256",
  "status": "VALID",
  "signatureCount": 1,
  "minRequiredSignatures": 1,
  "signatures": [
    {
      "issuerName": "CN=Ministry of Health,O=Government,C=SD",
      "signedAt": "2026-09-07T12:00:00Z",
      "receiptTime": "2026-09-07T12:00:01Z",
      "certWasValidAtSigning": true,
      "ocspStatusAtSigning": "GOOD"
    }
  ],
  "rendering": "JVBERi0xLjQK..."
}`} language="json" />
            </div>
          </StepSection>

          {/* Reference */}
          <section id="reference" className="scroll-mt-28">
            <h2 className="mb-6 text-2xl font-black text-primary">المرجع السريع</h2>

            <h3 className="mb-3 text-lg font-bold text-primary">نقاط نهاية API</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-right font-bold text-primary">الطريقة</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">المسار</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">الوصف</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['POST', '/api/certs/enroll', 'تسجيل شهادة مصدر'],
                    ['POST', '/api/documents/initiate', 'بدء وثيقة جديدة'],
                    ['POST', '/api/documents/{docId}/signatures', 'إرسال توقيع CAdES-BES'],
                    ['POST', '/api/documents/{docId}/revoke', 'إلغاء وثيقة'],
                    ['POST', '/api/documents/verify', 'التحقق من صلاحية وثيقة'],
                    ['GET', '/api/documents/health', 'فحص صحة الخدمة'],
                  ].map(([method, path, desc], i) => (
                    <tr key={i} className="bg-card">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-accent">{method}</td>
                      <td className="px-4 py-3 font-mono text-xs text-primary">{path}</td>
                      <td className="px-4 py-3 text-muted-foreground">{desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <h3 className="mb-3 mt-8 text-lg font-bold text-primary">ردود الأخطاء الشائعة</h3>
            <div className="overflow-hidden rounded-xl border border-border">
              <table className="w-full text-sm">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-4 py-3 text-right font-bold text-primary">الرمز</th>
                    <th className="px-4 py-3 text-right font-bold text-primary">الخطأ</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {[
                    ['400', 'Hash does not match rendering'],
                    ['400', 'Certificate is not currently certified GOOD by OCSP'],
                    ['400', 'Signing time is outside the certificate validity period'],
                    ['400', 'Issuer already enrolled'],
                    ['404', 'Document not found'],
                    ['409', 'Issuer has already signed this document'],
                    ['409', 'Document is revoked'],
                    ['413', 'Request body exceeds ~15 MB'],
                  ].map(([code, msg], i) => (
                    <tr key={i} className="bg-card">
                      <td className="px-4 py-3 font-mono text-xs font-bold text-red-500">{code}</td>
                      <td className="px-4 py-3 font-mono text-xs text-muted-foreground">{msg}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

        </main>
      </div>
    </div>
  )
}
