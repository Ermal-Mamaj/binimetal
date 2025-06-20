# This file is for reference only and is not used in the Next.js app
# To run the FastAPI app, use: python main.py

from fastapi import FastAPI, Request, Form, HTTPException
from fastapi.responses import HTMLResponse, JSONResponse, RedirectResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel, EmailStr, Field, ValidationError
import os
from typing import Optional, Dict, Any, List
import uvicorn
import json
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize FastAPI app
app = FastAPI(title="Bini Metal Website")

# Mount static files directory
app.mount("/static", StaticFiles(directory="static"), name="static")

# Set up templates
templates = Jinja2Templates(directory="templates")

# Contact form model with validation
class ContactForm(BaseModel):
    firstName: str = Field(..., min_length=1, error_messages={"min_length": "Emri është i detyrueshëm"})
    lastName: str = Field(..., min_length=1, error_messages={"min_length": "Mbiemri është i detyrueshëm"})
    email: EmailStr = Field(..., error_messages={"type": "Email-i nuk është i vlefshëm"})
    phone: str = Field(..., min_length=1, error_messages={"min_length": "Numri i telefonit është i detyrueshëm"})
    projectType: Optional[str] = None
    message: str = Field(..., min_length=1, error_messages={"min_length": "Mesazhi është i detyrueshëm"})

# Projects data - Featured projects (shown on homepage)
featured_projects = [
    {
        "title": "Ndërtesë Komerciale",
        "description": "Fabrikim dhe instalim i strukturës metalike për një ndërtesë komerciale.",
        "images": ["/static/images/logo.png"],
        "altText": "Strukturë metalike për ndërtesë komerciale",
        "category": "Komerciale"
    },
    {
        "title": "Stadium Sportiv",
        "description": "Dizajn dhe ndërtim i një stadiumi sportiv modern me fasadë të kuqe dhe strukturë metalike.",
        "images": ["/static/images/logo.png"],
        "altText": "Stadium sportiv me fasadë të kuqe",
        "category": "Sportive"
    },
    {
        "title": "Depo Industriale",
        "description": "Ndërtimi i strukturës metalike për një depo industriale me pamje panoramike nga malet.",
        "images": ["/static/images/logo.png"],
        "altText": "Strukturë metalike për depo industriale në perëndim dielli",
        "category": "Industriale"
    },
    {
        "title": "Projekt i Ardhshëm",
        "description": "Detajet e këtij projekti do të shtohen së shpejti. Kontaktoni për më shumë informacion.",
        "images": ["/static/images/logo.png"],
        "altText": "Logo e Bini Metal",
        "category": "Të Ardhshme"
    },
]

if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
