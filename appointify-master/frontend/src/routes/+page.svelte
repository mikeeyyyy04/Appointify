<script lang="ts">
    import {token} from "@/stores";
    import LandingScreen from "@/components/ui/screens/LandingScreen.svelte";
</script>

<div>
    {#if $token === null}
        <LandingScreen on:navigate/>
    {/if}
</div>