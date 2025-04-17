<script>
    export let data;
</script>

<h1>SSR Test Page</h1>
<div>
    <p>Server Time: {data.serverTime}</p>
    <p>Running on: {data.environment}</p>
</div>

<style>
    div {
        padding: 1rem;
        border: 1px solid #ccc;
        border-radius: 4px;
        margin: 1rem 0;
    }
</style>