import React, {useEffect, useState} from 'react';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {SmsOutlined} from '@material-ui/icons';
import {useParams} from 'react-router-dom';
import axios from 'axios';
import DeatilBooking from './DeatilBooking';
function DatailPrice(props) {
	const [btnLike, setBtnLike] = useState(false);
	const {num} = useParams();
	const [roomData, setRoomData] = useState('');
	const [facility, setFacility] = useState([]);
	const [category, setCategory] = useState('');

	//룸관련 데이터 출력
	const onSelectData = () => {
		let url = localStorage.url + '/detailInfo?num=' + num;
		axios.get(url).then((res) => {
			setRoomData(res.data.roomData);
			setCategory(res.data.category);
			setFacility(res.data.facility);
		});
	};

	useEffect((e) => {
		onSelectData(num);
	}, []);

	//하트 누르기
	const clickedToggle = () => {
		setBtnLike((prev) => !prev);
	};
	return (
		<div className='priceBanner' style={{width: '100%'}}>
			<div className='priceEvent'>
				<b style={{fontSize: '13px'}}>세부공간 선택 </b>
				<span
					style={{
						float: 'right',
						fontSize: '15px',
					}}
				>
					<span style={{paddingRight: '10px'}}>
						<SmsOutlined />
					</span>
					<span
						onClick={clickedToggle}
						toggle={btnLike}
						style={{
							color: btnLike ? '#704de4' : 'black',
						}}
					>
						{btnLike ? (
							<FavoriteIcon style={{marginBottom: '3px'}} />
						) : (
							<FavoriteBorderIcon />
						)}
					</span>
					<span>
						<img
							alt=''
							src='https://github.com/MoiM-Project/data/blob/main/icon/black.png?raw=true'
							style={{
								width: '23px',
								height: '23px',
								marginLeft: '8px',
								marginBottom: '5px',
							}}
						/>
					</span>
				</span>
			</div>
			<div
				style={{
					textAlign: 'center',
					paddingTop: '30px',
					paddingBottom: '20px',
				}}
			>
				{roomData.payment === '바로결제' ? (
					<h6>
						<b>결제 후 바로 예약확정</b>
					</h6>
				) : (
					<h6>
						<b>호스트 승인 후 예약확정</b>
					</h6>
				)}

				<span className='smallContent'>
					<span>빠르고 확실한 예약을 위해 MoiM에서</span>
					<br />
					<span>온라인 결제를 진행하세요.</span>
				</span>
			</div>
			<hr />
			<div className='detailPriceInfo'>
				<div className='detailPriceImg'>
					<img
						alt=''
						src={roomData.thumbnailImage}
						style={{width: '85%', height: '140px'}}
					/>
				</div>
				<br />
				<div>
					<ul>
						<li style={{borderTop: '1px solid #ebebeb'}}>
							<span>공간유형 : </span>
							<span>{category[0]}</span>
						</li>
						<li style={{borderTop: '1px solid #ebebeb'}}>
							<span>예약시간 : </span>
							<span>최소 1시간</span>
						</li>
						<li
							style={{
								borderTop: '1px solid #ebebeb',
								borderBottom: '1px solid #ebebeb',
							}}
						>
							<span>수용인원 : </span>
							<span>최대 {roomData.headcount}명</span>
						</li>
					</ul>
				</div>
				<div>
					{facility &&
						facility.map((item, idx) => (
							<div style={{display: 'flex'}} key={idx}>
								<img
									alt=''
									src={item.imageUrl}
									width='20'
									height={20}
								/>
								&nbsp;&nbsp;
								<p style={{fontSize: '10px'}}>{item.fname}</p>
							</div>
						))}
				</div>

				<DeatilBooking />
			</div>
		</div>
	);
}

export default DatailPrice;
