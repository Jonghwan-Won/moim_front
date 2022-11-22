import {SearchRounded} from '@material-ui/icons';
import React, {useRef, useState} from 'react';
import NoticeListAdmin from './NoticeListAdmin';
//dialogue 관련
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {FormControl} from '@material-ui/core';

import {makeStyles} from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';

import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';

function NoticeManagement(props) {
	const input = useRef(null);
	const [noticeList, setNoticeList] = useState('');
	const [searchWord, setSearchWord] = useState('');

	//input text 에 엔터키 적용시키기
	const handleOnKeyPress = (e) => {
		if (e.key === 'Enter') {
			// Enter 입력이 되면
			handleClick(); //검색 버튼 클릭 이벤트 실행
		}
	};

	//검색 버튼 클릭 시 이벤트
	const handleClick = (e) => {
		//searchWord에 입력값 저장
		setSearchWord(input.current.value);
	};

	//modal dialogue 관련
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	//modal 내부의 select 관련
	const useStyles = makeStyles((theme) => ({
		formControl: {
			margin: theme.spacing(1),
			minWidth: 120,
		},
		selectEmpty: {
			marginTop: theme.spacing(2),
		},
	}));

	const classes = useStyles();
	const [state, setState] = React.useState({
		age: '',
		name: 'hai',
	});

	const handleChange = (event) => {
		const name = event.target.name;
		setState({
			...state,
			[name]: event.target.value,
		});
	};

	return (
		<div>
			<div
				className='noticeSearch'
				style={{
					width: '100%',
					// border: '1px solid gray',
					border: 'none',
					borderRadius: '10px',
					backgroundColor: 'white',
					boxShadow: '0px 2px 2px 1px rgba(0 0 0 / 10%)',
				}}
			>
				<SearchRounded
					style={{
						fontSize: '30px',
						marginBottom: '-5px',
						marginLeft: '10px',
						marginRight: '20px',
						cursor: 'pointer',
						color: 'gray',
					}}
				/>
				<input
					type={'text'}
					className='searchContainer'
					style={{
						width: '90%',
						height: '60px',

						outline: 'none',
						border: 'none',
						// backgroundColor: 'rgba(240, 242, 245)',
						backgroundColor: 'white',
					}}
					placeholder='공지사항 / 이벤트의 제목을 입력해주세요'
					ref={input}
					onKeyPress={handleOnKeyPress}
				/>
			</div>

			<br />
			{/* 검색 여부에 따른 삼항 연산자 */}
			<div
				style={{
					marginLeft: '10px',
					paddingTop: '5px',
					display: 'flex',
					justifyContent: 'space-between',
				}}
			>
				{searchWord !== '' ? (
					//검색단어 있으면서, 결과가 있을때
					noticeList.length !== 0 ? (
						<b>
							'{{searchWord}.searchWord}' (으)로 검색된 게시글 :{' '}
							{noticeList.length} 개
						</b>
					) : (
						//검색단어 있으면서, 결과가 없을때
						<b>
							'{{searchWord}.searchWord}' (으)로 검색된 게시글이
							없습니다.
						</b>
					)
				) : //삼항 연산자 중첩 시작
				//검색단어 없으면서, 결과가 있을때
				noticeList.length !== 0 ? (
					<b>조회된 게시글 : {noticeList.length} 개</b>
				) : (
					//검색단어 없으면서, 결과가 없을때
					<b>등록된 게시글이 없습니다.</b>
				)}

				<button
					type='button'
					className='btn btn-secondary'
					onClick={handleClickOpen}
				>
					작성하기
				</button>
				<Dialog open={open} onClose={handleClose}>
					<DialogTitle>공지사항 등록</DialogTitle>
					<DialogContent>
						<DialogContentText>
							'유형'을 선택한 후 제목과 내용을 작성해주시기
							바랍니다.
							<br /> 작성이 완료되면 '완료' 버튼을 눌러 마무리하실
							수 있습니다.
						</DialogContentText>

						<FormControl className={classes.formControl}>
							<InputLabel htmlFor='age-native-simple'>
								유형
							</InputLabel>
							<Select
								native
								value={state.age}
								onChange={handleChange}
								inputProps={{
									name: 'age',
									id: 'age-native-simple',
								}}
							>
								<option aria-label='None' value='' />
								<option value={'이벤트'}>이벤트</option>
								<option value={'공지사항'}>공지사항</option>
							</Select>
						</FormControl>

						<TextField
							autoFocus
							margin='dense'
							id='name'
							label='제목을 입력해주세요'
							type='text'
							fullWidth
							variant='standard'
						/>
						<textarea className='form-control' />
						<input type={'file'} className='form-control' />
					</DialogContent>
					<DialogActions>
						<Button onClick={handleClose}>취소</Button>
						<Button onClick={handleClose}>저장</Button>
					</DialogActions>
				</Dialog>
			</div>
			<NoticeListAdmin
				noticeList={noticeList}
				setNoticeList={setNoticeList}
				searchWord={searchWord}
			/>
		</div>
	);
}

export default NoticeManagement;
