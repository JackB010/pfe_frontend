<script>
	export let number;
	// export let locale = 'en';
	let formattedNumber;
	$: {
		formattedNumber = number.toLocaleString('fr', {
			notation: 'compact',
			compactDisplay: 'short',
		});
	}
</script>

<span>{formattedNumber}</span>

<style>
	span {
		font-variant-numeric: tabular-nums;
	}
</style>
