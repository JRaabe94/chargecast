"""Local static preview: python deploy/serve_frontend.py (no Vite/API needed)."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parent.parent


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "frontend"), **kwargs)

    def translate_path(self, path):
        if urlsplit(path).path == "/data/forecast.json":
            return str(ROOT / "data/predictions/forecast.json")
        return super().translate_path(path)

    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


if __name__ == "__main__":
    print("Frontend: http://127.0.0.1:5173", flush=True)
    ThreadingHTTPServer(("127.0.0.1", 5173), Handler).serve_forever()
