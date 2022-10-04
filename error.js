setTimeout(() => {
	throw new Error('here!');
}, 300);

process.on('uncaughtException', () => {
	console.log('crapper!');
});

process.on('unhandledRejection', () => {
	console.log('crap!');
});
