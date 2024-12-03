import cn from 'clsx';
import style from './Form.module.css';
import { useTheme } from '../../providers/useTheme';

const Form = ({ onSubmit, onSuccess, onError, children, className }) => {

	const { theme } = useTheme();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const formData = new FormData(e.target);

		const data = Object.fromEntries(formData);

		try {
			await onSubmit(data);
			onSuccess && onSuccess(data);
		} catch (error) {
			onError && onError(error);
		}
	};

	return (
		<form role="form"
			className={cn(style.form, theme === 'dark' && style.dark, className)}
			onSubmit={handleSubmit}
			autoComplete="off"
		>
			{children}
		</form>
	);
};

export { Form };
