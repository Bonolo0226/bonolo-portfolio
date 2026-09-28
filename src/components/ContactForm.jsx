import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

const initialValues = { name: "", email: "", subject: "", message: "" };

function validate(values) {
  const errors = {};
  if (!values.name.trim()) errors.name = "Please enter your name.";
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.subject.trim()) errors.subject = "Please enter a subject.";
  if (!values.message.trim()) errors.message = "Please enter a message.";
  return errors;
}

export default function ContactForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (field) => (event) => {
    setValues((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      // No backend is wired up yet — this confirms the form works end to
      // end. Once an email address or form endpoint is added, this is
      // where the actual send request would go.
      setSubmitted(true);
      setValues(initialValues);
    }
  };

  if (submitted) {
    return (
      <div
        role="status"
        className="glass-strong flex flex-col items-center gap-3 rounded-[24px] px-6 py-10 text-center"
      >
        <CheckCircle2 className="text-accent" size={32} />
        <p className="font-display text-lg font-medium text-text-primary">
          Message ready to send
        </p>
        <p className="max-w-sm text-sm text-text-secondary">
          Thanks for reaching out - form submission works. Once a live
          contact email is connected, this is where your message would be
          sent.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-2 text-sm text-accent underline-offset-4 hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field
        id="name"
        label="Name"
        value={values.name}
        onChange={handleChange("name")}
        error={errors.name}
      />
      <Field
        id="email"
        type="email"
        label="Email"
        value={values.email}
        onChange={handleChange("email")}
        error={errors.email}
      />
      <Field
        id="subject"
        label="Subject"
        value={values.subject}
        onChange={handleChange("subject")}
        error={errors.subject}
      />
      <Field
        id="message"
        label="Message"
        as="textarea"
        rows={5}
        value={values.message}
        onChange={handleChange("message")}
        error={errors.message}
      />

      <button
        type="submit"
        className="glossy-gold w-full rounded-full px-6 py-3 text-sm font-semibold transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto"
      >
        Send Message
      </button>
    </form>
  );
}

function Field({ id, label, error, as = "input", ...props }) {
  const Component = as;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm text-text-secondary">
        {label}
      </label>
      <Component
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className="glass w-full rounded-2xl px-4 py-2.5 text-sm text-text-primary outline-none transition-colors placeholder:text-text-muted focus:border-white/80"
        {...props}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}
