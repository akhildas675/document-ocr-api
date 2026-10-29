# Document OCR API

A REST API built with Node.js, Express, and TypeScript to extract structured information from uploaded document images using OCR.

## Features

- Upload front and back document images.
- Validate image formats.
- Preprocess images using Sharp.
- Extract text using Tesseract.js.
- Extract structured fields from OCR results.
- Validate extracted field formats.
- Return results through a REST API.

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Sharp
- Tesseract.js
- Multer

## Project Structure

```text
src/
├── config/
├── controllers/
├── dto/
├── interface/
├── middleware/
├── routes/
├── service/
├── app.ts
└── server.ts
```

## Installation

```bash
git clone https://github.com/akhildas675/document-ocr-api.git
cd document-ocr-api
npm install
```

## Environment Variables

Create a `.env` file in the project root.

```env
PORT=3000
CLIENT=http://localhost:5173
```

Configure any additional environment variables required by your application.

## Run Locally

Development:

```bash
npm run dev
```

Build:

```bash
npm run build
```

Production:

```bash
npm start
```

## API Endpoint

**POST** `/api/parse`

Upload both images using `multipart/form-data`.

| Field | Type |
|---|---|
| `frontImage` | Image file |
| `backImage` | Image file |

Supported formats: JPEG, PNG, WebP.

Maximum upload size: 5 MB per image, subject to the configured upload middleware.

## Response

The API returns extracted front-side details, back-side details, and field-format validation results.

## Architecture

The project uses a service-based architecture with interfaces to separate image validation, image preprocessing, OCR, field extraction, and validation.

## License

Add your chosen license before distributing this project.
