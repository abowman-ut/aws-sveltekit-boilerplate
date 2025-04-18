<script>
    let {
        onClick = () => {
            throw new Error('No click handler provided');
        },
        text = 'Sign Up'
    } = $props();
</script>

<button
    type="button"
    onclick={onClick}
>
    {text}
</button> 