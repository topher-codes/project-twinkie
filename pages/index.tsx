export default function Home() {
	return (
		<div className="container">
			<h1>Home</h1>
			<form>
				<FormInput type="text" placeholder="Look at me!" label="First Thing" />
				<FormInput type="text" placeholder="Look at me!" label="Second Thing" />
				<FormInput type="text" placeholder="Look at me!" label="Third Thing" />
				<FormInput type="text" placeholder="Look at me!" label="Fourth Thing" />
			</form>
		</div>
	);
}

function FormInput(props: any) {
	return (
		<div>
			{props.label}
			<input
				type={props.type}
				className="form-input"
				placeholder={props.placeholder}
			/>
		</div>
	);
}
