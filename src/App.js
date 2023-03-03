import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
	const [error, setError] = useState(null);
	const [isLoaded, setIsLoaded] = useState(false);
	const [items, setItems] = useState([]);

	useEffect(() => {
		fetch('https://v2.jokeapi.dev/joke/Programming?amount=10')
			.then((res) => res.json())
			.then(
				(result) => {
					setIsLoaded(true);
					setItems(result);
				},
				(error) => {
					setIsLoaded(true);
					setError(error);
				}
			);
	}, []);

	if (error) {
		return <div>Error: {error.message}</div>;
	} else if (!isLoaded) {
		return <div>Loading...</div>;
	} else {
		return (
			<>
				<h1 className='title'>
					🃏Your TOP 10 Jokes after page refresh 🃏
				</h1>
				{items.jokes.map((item) => {
					if (item.type === 'single') {
						return (
							<div className='joke-container' key={Math.random()}>
								<p className='joke'>{item.joke}</p>
							</div>
						);
					} else {
						return (
							<div className='joke-container' key={Math.random()}>
								<p className='joke'>
									{item.setup} {item.delivery}
								</p>
							</div>
						);
					}
				})}
			</>
		);
	}
}

export default App;
