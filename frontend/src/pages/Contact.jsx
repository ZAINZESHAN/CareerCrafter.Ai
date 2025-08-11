import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
      .send(
        'service_so9e62k',
        'template_ydg6fcg',
        {
          from_name: form.name,
          from_email: form.email,
          message: form.message,
        },
        'c9JOSnQdN_jBACtrO'
      )
      .then(
        () => {
          setLoading(false);
          toast.success('Your message has been sent!');
          setForm({ name: '', email: '', message: '' });
        },
        (error) => {
          setLoading(false);
          toast.error('Failed to send message. Please try again.');
        }
      );
  };

  return (
    <div className="max-w-3xl mx-auto px-0 sm:px-4 py-10 sm:py-16">
      <h1
        className="text-[25px] sm:text-[30px] sm:text-4xl text-center mb-6"
        style={{ color: 'black', fontWeight: 600 }}
      >
        Contact Us
      </h1>
      <p className="text-[14px] sm:text-[17px] text-gray-700 text-center mb-10">
        Got a question, feedback, or need support? Fill out the form below and we'll get back to you soon.
      </p>

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-xl shadow-md">
        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Your Name</label>
          <Input
            name="name"
            placeholder="Enter your name"
            value={form.name}
            onChange={handleChange}
            size="large"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Your Email</label>
          <Input
            name="email"
            type="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            size="large"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Your Message</label>
          <Input.TextArea
            name="message"
            placeholder="Write your message here..."
            value={form.message}
            onChange={handleChange}
            rows={5}
            required
          />
        </div>

        <div className="flex justify-end">
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
            className="px-8"
          >
            Send Message
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Contact;
