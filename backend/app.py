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

    # Run OMER to generate MusicXML
    subprocess.run(["oemer", filename], check=True)

    # Convert filename to .musicxml
    xml_file = filename.rsplit(".", 1)[0] + ".musicxml"

    if not os.path.exists(xml_file):
        return jsonify({"error": "No MusicXML generated"}), 500

    try:
        from musicxml_parser import summarize_file
        plain_text_summary = summarize_file(xml_file)
    except Exception as e:
        return jsonify({"error": f"Parsing failed: {str(e)}"}), 500

    return jsonify({
        "success": True,
        "result": plain_text_summary
    })

# Start ngrok tunnel
public_url = ngrok.connect(5000).public_url
print("Server running at:", public_url)

app.run(port=5000)


