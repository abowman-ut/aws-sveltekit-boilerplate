<script>
    import { onMount } from 'svelte';
    import { isAuthenticated, user } from '$lib/stores/auth';
    import { page } from '$app/stores';
    import { signOutUser } from '$lib/stores/auth';
    import { goto } from '$app/navigation';
    import BtnAuthSignOut from '$lib/components/BtnAuthSignOut.svelte';

    let { children } = $props();

    onMount(() => {
        import('$lib/amplify').catch(error => {
            console.error('❌ Error initializing Amplify:', error);
        });
    });

    async function handleLogout() {
        try {
            await signOutUser();
            goto('/auth');
        } catch (error) {
            console.error('❌ Error signing out:', error);
        }
    }
</script>

<div>
    <a href="/">Home</a> | 
    {#if $isAuthenticated}
        <a href="/dashboard">Dashboard</a> |
        <BtnAuthSignOut
            onClick={handleLogout}
            showUsername={true}
            username={$user?.signInDetails?.loginId}
        />
    {:else}
        <a href="/auth">Sign In</a>
    {/if}
</div>

<main>
    {@render children()}
</main>
