from pdfminer.high_level import extract_text
import io
import json
import requests

def extract_text_from_pdf(file_bytes):
    with io.BytesIO(file_bytes) as f:
        return extract_text(f)

def structure_with_llama(text: str):
    # Limiter la longueur du texte pour accélérer le traitement
    text = text[:5000]

    prompt = f"""
Tu es un expert en RH. Tu dois structurer ce CV brut au format JSON suivant (language francais) (summary = profil dans le CV) :

{{
  "fullName": "",
  "email": "",
  "tel": "",
  "country": "",
  "gender": "",
  "phone": "",
  "state": "",
  "linkedin": "",
  "website": "",
  "userId": "",
  "profession": "",
  "summary": "",
  "skills": ["", ""],
  "experiences": [
    {{
      "job_title": "",
      "company": "",
      "start_date": "",
      "end_date": "",
       "location":"",
      "description": ""
    }}
  ],
  "educations": [
    {{
      "degree": "",
      "school": "",
      "start_date": "",
      "end_date": ""
    }}
  ]
}}

Voici le CV :
{text}

Retourne uniquement le JSON, sans explication ni balise ```.
"""

    try:
        response = requests.post("http://localhost:11434/api/generate", json={
            "model": "mistral",
            "prompt": prompt,
            "stream": False,
            "options": {
                
            }
        })

        print("Status:", response.status_code)
        print("Raw response:", response.text[:300] + "..." if len(response.text) > 300 else response.text)

        data = response.json()
        content = data.get("response", "").strip()

        if not content:
            raise ValueError("Pas de contenu dans la réponse Ollama.")

        # Extraire le JSON du texte brut (au cas où le modèle ajouterait du texte)
        start = content.find('{')
        end = content.rfind('}') + 1
        cleaned_json = content[start:end]

        return json.loads(cleaned_json)

    except Exception as e:
        print("Erreur lors de l'analyse du CV avec LLaMA/Mistral :", e)
        return {"error": str(e)}
