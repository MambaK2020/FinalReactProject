import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import css from './CallToActionForm.module.css';

const schema = yup.object({
  name: yup
    .string()
    .min(2, 'Name must contain at least 2 characters')
    .matches(/^[a-zA-Zа-яА-ЯіІїЇєЄґҐ'\s-]+$/, 'Name can only contain letters')
    .required('Name is required'),
  phone: yup
    .string()
    .test('phone-format', 'Invalid phone format', (value) => {
      const uaRegex = /^\+38\d{10}$/;
      const deRegex = /^\+49\d{9,12}$/;
      return uaRegex.test(value) || deRegex.test(value);
    })
    .required('Phone number is required'),
  email: yup
    .string()
    .email('Please enter a valid email address')
    .required('Email is required'),
});

const CallToActionForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      phone: '',
      email: '',
    },
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log('CTA form data:', data);
  };

  const formatPhoneInput = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    if (value.startsWith('38')) {
      value = '+38' + value.slice(2);
    } else if (value.startsWith('49')) {
      value = '+49' + value.slice(2);
    }

    if (value.startsWith('+38') && value.length > 13) return;
    if (value.startsWith('+49') && value.length > 14) return;

    e.target.value = value;
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={css.form} noValidate>
      <input
        {...register('name')}
        placeholder="Name"
        className={css.input}
        aria-invalid={!!errors.name}
      />
      {errors.name && <p className={css.errors}>{errors.name.message}</p>}

      <input
        {...register('phone')}
        placeholder="Phone number"
        onChange={formatPhoneInput}
        className={css.input}
        aria-invalid={!!errors.phone}
      />
      {errors.phone && <p className={css.errors}>{errors.phone.message}</p>}

      <input
        {...register('email')}
        placeholder="Email"
        className={css.input}
        aria-invalid={!!errors.email}
      />
      {errors.email && <p className={css.errors}>{errors.email.message}</p>}

      <button className={css.button} type="submit">
        Get a discount
      </button>
    </form>
  );
};

export default CallToActionForm;
