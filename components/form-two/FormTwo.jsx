import {
	ButtonStyles,
	ErrorText,
	FormItem,
	InputStyles,
	LabelStyles,
	MainButtonStyles,
	NoteText,
	SecondaryButtonStyles,
	Section,
} from '../../pages/index.styles';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faCircleChevronDown, faInfo } from '@fortawesome/free-solid-svg-icons';
import {
	CloseButton,
	Container,
	DropdownCheckbox,
	DropdownContainer,
	DropdownItem,
	FontAwesomeIconStyles,
	IconWrapper,
	ModalContainer,
	ModalContent,
	ModalImage,
	ModalText,
	ModalTitle,
} from './FormTwo.styles';

import Modal from 'react-modal';
import { useEffect, useState } from 'react';
import { checkDomain, checkResume } from '../../utils/validation';

// import * as ResumeGuide from '../../public/images/resume-guide.png';

const customStyles = {
	overlay: {
		backgroundColor: 'rgba(25, 23, 23, 0.91)',
	},
	content: {
		top: '50%',
		left: '50%',
		right: 'auto',
		bottom: 'auto',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
		backgroundColor: '#2C2728',
		border: 0,
		color: 'white',
	},
};

const FormTwo = ({ slideForm, data, handleChange, setFormData }) => {
	const [isOpen, setIsOpen] = useState(true);
	const [dropdownOpen, setDropdownOpen] = useState(false);
	const [domainsArray, setDomainsArray] = useState(data.domains.split(', '));

	useEffect(() => {
		if (data.domains === '') {
			setDomainsArray([]);
		}
	}, []);

	const openDropdown = () => setDropdownOpen(!dropdownOpen);

	const handleCheckbox = (e) => {
		const { value } = e.target;
		if (e.target.checked) {
			if (domainsArray.length === 4) {
				return alert('You can only select at most 4 domains');
			}
			setDomainsArray([...domainsArray, value]);
		} else {
			setDomainsArray(domainsArray.filter((domain) => domain !== value));
		}
	};

	const handleSubmit = (e) => {
		if (
			checkResume(data.resume).valid &&
			checkDomain(domainsArray.join(', ')).valid
		) {
			fetch('/api/submit', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ ...data, domains: domainsArray.join(', ') }),
			})
				.then(() => {
					setFormData({});
					slideForm(3);
				})
				.catch(() => {
					setFormData({});
					slideForm(4);
				});

			// print to screen
			// alert(content.data.tableRange)

			// Reset the form fields

			// TODO: add actual thing
			slideForm(3);
		} else {
			alert('Please fill out all the required fields');
		}
	};

	const handleBack = () => {
		console.log(domainsArray);
		setFormData({
			...data,
			domains: domainsArray.join(', '),
		});
		slideForm(1);
	};

	return (
		<Section>
			<Modal isOpen={isOpen} style={customStyles} contentLabel='Example Modal'>
				<CloseButton onClick={() => setIsOpen(false)}>X</CloseButton>
				<ModalContainer>
					<ModalTitle>Uploading your resume</ModalTitle>
					<ModalContent>
						<ModalText>
							Please upload your resume to your google drive.
						</ModalText>
						<ModalText>
							While sharing the link, please make sure that the link is set to
							public as follow:
						</ModalText>
					</ModalContent>
					<ModalImage src='./images/resume-guide.png' />
				</ModalContainer>
			</Modal>
			<FormItem>
				<LabelStyles>
					Resume Link *
					<IconWrapper onClick={() => setIsOpen(true)}>
						<FontAwesomeIcon
							icon={faInfo}
							style={{ fontSize: 14, color: 'white' }}
						/>
					</IconWrapper>
					<ErrorText>{checkResume(data.resume).message}</ErrorText>
				</LabelStyles>
				<InputStyles
					type='text'
					name='resume'
					placeholder='Enter your resume link'
					value={data.resume}
					onChange={handleChange}
				/>
			</FormItem>
			<FormItem>
				<LabelStyles>
					Add your project(s) <NoteText>Separate mutliple by commas</NoteText>
				</LabelStyles>
				<InputStyles
					type='text'
					name='projects'
					placeholder='Enter your project(s)'
					value={data.projects}
					onChange={handleChange}
				/>
			</FormItem>
			<FormItem>
				<LabelStyles>
					Other Skill(s) <NoteText>Separate mutliple by commas</NoteText>
				</LabelStyles>
				<InputStyles
					type='text'
					name='skills'
					placeholder='Enter your skill(s)'
					value={data.skills}
					onChange={handleChange}
				/>
			</FormItem>
			<FormItem>
				<LabelStyles>
					Domain(s) of Interest *{' '}
					<ErrorText>{checkDomain(domainsArray.join(', ')).message}</ErrorText>
				</LabelStyles>
				<Container onClick={openDropdown}>
					<InputStyles
						type='text'
						name='interests'
						placeholder='Select your domain(s)'
						value={domainsArray.join(', ')}
						onChange={handleChange}
						disabled
					/>
					<FontAwesomeIconStyles
						icon={faCircleChevronDown}
						style={{ fontSize: 24, color: 'black' }}
					/>
				</Container>
				{dropdownOpen && (
					<DropdownContainer>
						<DropdownItem>
							<DropdownCheckbox
								type='checkbox'
								value='Web Development'
								checked={domainsArray.includes('Web Development')}
								onChange={handleCheckbox}
							/>
							Web development
						</DropdownItem>
						<DropdownItem>
							<DropdownCheckbox
								type='checkbox'
								value='Mobile Development'
								checked={domainsArray.includes('Mobile Development')}
								onChange={handleCheckbox}
							/>
							Mobile development
						</DropdownItem>
						<DropdownItem>
							<DropdownCheckbox
								type='checkbox'
								value='Game Development'
								checked={domainsArray.includes('Game Development')}
								onChange={handleCheckbox}
							/>
							Game development
						</DropdownItem>
						<DropdownItem>
							<DropdownCheckbox
								type='checkbox'
								value='UI/UX Design'
								checked={domainsArray.includes('UI/UX Design')}
								onChange={handleCheckbox}
							/>
							UI/UX Design
						</DropdownItem>
						<DropdownItem>
							<DropdownCheckbox
								type='checkbox'
								value='Cloud Computing'
								checked={domainsArray.includes('Cloud Computing')}
								onChange={handleCheckbox}
							/>
							Cloud Computing
						</DropdownItem>
						<DropdownItem>
							<DropdownCheckbox
								type='checkbox'
								value='Competitive Programming'
								checked={domainsArray.includes('Competitive Programming')}
								onChange={handleCheckbox}
							/>
							Competitive Programming
						</DropdownItem>
						<DropdownItem>
							<DropdownCheckbox
								type='checkbox'
								value='AI/ML'
								checked={domainsArray.includes('AI/ML')}
								onChange={handleCheckbox}
							/>
							AI/ML
						</DropdownItem>
					</DropdownContainer>
				)}
			</FormItem>
			<FormItem>
				<LabelStyles>
					Other Interest(s) <NoteText>Separate mutliple by commas</NoteText>
				</LabelStyles>
				<InputStyles
					type='text'
					name='interests'
					placeholder='Enter your interest(s)'
					value={data.interests}
					onChange={handleChange}
				/>
			</FormItem>
			<ButtonStyles>
				<MainButtonStyles onClick={handleSubmit}>Submit</MainButtonStyles>
			</ButtonStyles>

			<ButtonStyles>
				<SecondaryButtonStyles onClick={handleBack}>Back</SecondaryButtonStyles>
			</ButtonStyles>
		</Section>
	);
};

export default FormTwo;