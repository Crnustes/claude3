import { useState } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';

const ContactWrapper = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f8f8;
`;

const ContactTitle = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
`;

const FormWrapper = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

const Input = styled(Field)`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
`;

const TextArea = styled(Field)`
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  height: 150px;
`;

const SubmitButton = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ErrorMessage = styled.div`
  color: red;
  margin-bottom: 1rem;
`;

const ContactSchema = Yup.object().shape({
  name: Yup.string().required('Nombre es requerido'),
  email: Yup.string().email('Email inválido').required('Email es requerido'),
  message: Yup.string().required('Mensaje es requerido'),
});

function Contact() {
    const [submitStatus, setSubmitStatus] = useState(null);
  
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
      try {
        // Aquí normalmente enviarías los datos a tu backend o servicio de correo
        // Por ahora, simularemos un envío exitoso
        await new Promise(resolve => setTimeout(resolve, 1000));
        setSubmitStatus('success');
        resetForm();
      } catch (error) {
        setSubmitStatus('error');
      } finally {
        setSubmitting(false);
      }
    };
  
    return (
      <ContactWrapper id="contact">
        <ContactTitle>Contáctame</ContactTitle>
        <FormWrapper>
          <Formik
            initialValues={{ name: '', email: '', message: '' }}
            validationSchema={ContactSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <Input type="text" name="name" placeholder="Nombre" />
                {errors.name && touched.name && <ErrorMessage>{errors.name}</ErrorMessage>}
                
                <Input type="email" name="email" placeholder="Email" />
                {errors.email && touched.email && <ErrorMessage>{errors.email}</ErrorMessage>}
                
                <TextArea component="textarea" name="message" placeholder="Mensaje" />
                {errors.message && touched.message && <ErrorMessage>{errors.message}</ErrorMessage>}
                
                <SubmitButton type="submit" disabled={isSubmitting}>
                  Enviar
                </SubmitButton>
              </Form>
            )}
          </Formik>
          {submitStatus === 'success' && <p>Mensaje enviado con éxito!</p>}
          {submitStatus === 'error' && <p>Hubo un error al enviar el mensaje. Por favor, intenta de nuevo.</p>}
        </FormWrapper>
      </ContactWrapper>
    );
  }
  
  export default Contact;