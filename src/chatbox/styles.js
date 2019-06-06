const styles = theme => ({
	sendBtn: {
		color: 'gray',
	    cursor: 'pointer',
	    '&:hover': {
	      color: 'blue'
	    }
	},
	chatboxContainer: {
		position: 'absolute',
	    bottom: '15px',
	    left: '315px',
	    boxSizing: 'border-box',
	    overflow: 'auto',
	    width: 'calc(100% - 300px - 50px)'
	},
	chatbox: {
		width: 'calc(100% - 25px)'
	}
});

export default styles;