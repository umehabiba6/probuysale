const FORM_ENDPOINT = "https://formspree.io/f/habibachand6";

export async function sendEmailInquiry(formData) {
  const payload = {
    "your-name": formData.name,
    "email": formData.email,
    "phone": formData.phone,
    "specimen-interest": formData.specimen,
    "budget-range": formData.budget,
    "message": formData.message,
  };

  const response = await fetch(FORM_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Formspree submit failed: ${body}`);
  }

  return response.json();
}
