import requests
import json

def fetch_rendered_react(url="http://localhost:3003/render"):
    try:
        response = requests.get(url)
        response.raise_for_status()
        return response.text
    except requests.exceptions.RequestException as e:
        return f"Error: {str(e)}"

if __name__ == "__main__":
    rendered_html = fetch_rendered_react()
    print(rendered_html)
