import React, { useState, useEffect, useRef } from 'react';
import { FixedSizeList as List } from 'react-window';
import { Overlay, Button } from 'react-bootstrap';
import './Notification.css'
const Notification = props => {
	const [temp, setRow] = useState([]);
	const [show, setShow] = useState(false);
	const target = useRef(null);
	const Row = ({ index }) => <div className="notify"  >{ temp[index]["title"]}</div>;
	useEffect(() => {
		fetch('https://jsonplaceholder.typicode.com/posts')
			.then(res => res.json())
			.then(data => {console.log(data);setRow(data)});
	}, []);

	return (
		<>
			<Button
				ref={target}
				style={{ backgroundColor: 'black', color: 'white', border: 'none', paddingBottom: '0px',marginTop:'3px',fontSize:'20px',marginRight:'30px'}}
				onClick={() => setShow(!show)}>
				Notification
			</Button>
			<Overlay target={target.current} show={show} placement="bottom">
				{({ placement, scheduleUpdate, arrowProps, outOfBoundaries, show: _show, ...props }) => (
					<div
						{...props}
						style={{
							backgroundColor:'white',
							padding: '2px 10px',
							color: 'black',
							border: 1,
							borderRadius: 3,
							...props.style,
							margin: 20,
						}}
					>
						<List height={350} itemCount={temp.length} itemSize={35} width={300}>
							{Row}
						</List>
					</div>
				)}
			</Overlay>
		</>
	);
};
export default Notification;
