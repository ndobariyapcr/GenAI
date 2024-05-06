import ValidationMessages from "@/components/validations/ValidationMessages";
import { Icon } from "@iconify/react";
import React from "react";
import { Button } from "react-bootstrap";

const Textinput = ({
	icon,
	label,
	name,
	type,
	value,
	error,
	onChange,
	onBlur,
	onClick,
	id,
	className = "",
	inputClass = "",
	placeholder,
	isButton = false,
	children,
	maxLength,
	disabled,
}) => {
	return (
		<div className={`floating-label-content ${className}`}>
			<input
				className={`form-control ${inputClass}`}
				id={id}
				name={name}
				type={type}
				value={value}
				onBlur={onBlur}
				onChange={onChange}
				maxLength={maxLength}
				placeholder={placeholder}
				disabled={disabled}
			/>
			{label && (
				<label htmlFor={id}>
					<Icon icon={icon} />
					{label ? label : "Add label"}
				</label>
			)}
			{isButton === true && (
				<Button variant="transparent" size="sm" className="show-password" onClick={onClick}>
					{children}
				</Button>
			)}
			<ValidationMessages errors={error} label={label} />
		</div>
	);
};

export default Textinput;
