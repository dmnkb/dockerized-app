import { useEffect, useCallback, useState } from "react";

const TodoListCard = () => {
	const [items, setItems] = useState(null);

	useEffect( () => {
		fetch('http://localhost:3000/api/items')
		.then(r => r.json())
		.then(setItems);
	}, []);

	const onNewItem = useCallback( newItem => { 
		setItems([...items, newItem]);
	}, [items]);
	
  	const onItemUpdate = useCallback( item => {
		const index = items.findIndex(i => i.id === item.id);
		setItems([...items.slice(0, index), item, ...items.slice(index + 1)]);
	}, [items]);

  	const onItemRemoval = useCallback( item => {
		let index = items.findIndex(i => i.id === item.id);
		setItems([...items.slice(0, index), ...items.slice(index + 1)]);
	}, [items]);
	
  	return !items ? "Loading..." :
		<>
			<AddItemForm onNewItem={onNewItem} />
			{items.length === 0 && (
				<p className="text-center">You have no todo items yet! Add one above!</p>
			)}
			{items.map(item => (
				<ItemDisplay
					item={item}
					key={item.id}
					onItemUpdate={onItemUpdate}
					onItemRemoval={onItemRemoval}
				/>
			))}
		</>
}

const AddItemForm = ({ onNewItem }) => {

  	const [newItem, setNewItem] = useState('');
  	const [submitting, setSubmitting] = useState(false);

  	const submitNewItem = e => {
    	e.preventDefault();
		setSubmitting(true);
		fetch('http://localhost/api/items', {
			method: 'POST',
			body: JSON.stringify({ name: newItem }),
			headers: { 'Content-Type': 'application/json' },
      	})
		.then(r => r.json())
		.then(item => {
			onNewItem(item);
			setSubmitting(false);
			setNewItem('');
		});
  	};

  	return (
		<form onSubmit={submitNewItem}>
			<input
				value={newItem}
				onChange={e => setNewItem(e.target.value)}
				type="text"
				placeholder="New Item"
				aria-describedby="basic-addon1"
        	/>
			<button
				type="submit"
				variant="success"
				disabled={!newItem.length}
				className={submitting ? 'disabled' : ''}
			>
				{submitting ? 'Adding...' : 'Add'}
			</button>
      	</form>
  	);
}

const ItemDisplay = ({ item, onItemUpdate, onItemRemoval }) => {
	const toggleCompletion = () => {
		fetch(`http://localhost/api/items/${item.id}`, {
			method: 'PUT',
			body: JSON.stringify({
				name: item.name,
				completed: !item.completed,
			}),
			headers: { 'Content-Type': 'application/json' },
		})
		.then(r => r.json())
		.then(onItemUpdate);
  	};

	const removeItem = () => {
		fetch(`http://localhost/api/items/${item.id}`, { method: 'DELETE' }).then(() =>
			onItemRemoval(item),
      	);
  	};

	return (
		<>
			<button onClick={toggleCompletion}>
				{item.completed ? '✅' : '❌'}
			</button>
			{item.name}
			<button onClick={removeItem} aria-label="Remove Item">
				Löschen
			</button>
      	</>
  	);
}

const App = () => {
	return <TodoListCard />
}

export default App;
