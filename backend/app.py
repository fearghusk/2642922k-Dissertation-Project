!pip install flask flask-cors pyngrok poetry
!pip install oemer

from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
from pyngrok import ngrok
!ngrok config add-authtoken 34bagi4XGHECPmKKLG7I0cS9vYp_5xvd2P2FEzad4Zw2g5nAa
import os
import subprocess

app = Flask(__name__)
CORS(app)

@app.route("/upload", methods=["POST"])
def upload():
    file = request.files["file"]
    filename = file.filename
    file.save(filename)

    # Run OMER on the uploaded image
    output_dir = "output"
    os.makedirs(output_dir, exist_ok=True)
    subprocess.run(["oemer", filename], check=True)

    # The output MusicXML file will have same name but .musicxml extension
    xml_file = filename.rsplit(".", 1)[0] + ".musicxml"

    if not os.path.exists(xml_file):
        return jsonify({"error": "No MusicXML generated"}), 500

    return send_file(xml_file, as_attachment=True)

# Start ngrok tunnel
public_url = ngrok.connect(5000).public_url
print("Server running at:", public_url)

app.run(port=5000)
