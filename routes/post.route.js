import express from 'express';

const router = express.Router();
// creating get, post, put, delete request endpoint

router.get('/', (req, res) => {
	res.send('Hello World');
	// res.send('Hello World')
	res.json({ name: 'John Doe', age: 30 });
});
router.post('/', (req, res) => {
	res.send('Hello World');
	// res.send('Hello World')
	res.json({ name: 'John Doe', age: 30 });
});
router.put('/', (req, res) => {
	res.send('Hello World');
});
router.delete('/', (req, res) => {
	res.send('Hello World');
});
// exporting the router
export default router;
