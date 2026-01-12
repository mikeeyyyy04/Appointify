<script lang="ts">
    import {Icon} from "@steeze-ui/svelte-icon";
    import {Eye, EyeOff, LockOpen} from "@steeze-ui/lucide-icons";

    export let password: string
    let showPassword: boolean = false

    export let classNames: string
    export let fieldClassNames: string = ""
</script>

<div class="w-full px-4 py-2.5 bg-zinc-50 border border-mountbatten-pink flex flex-row justify-between items-center gap-4 ${classNames}">
    <div class="flex flex-row items-center gap-4 w-full">
        <Icon src={LockOpen} size="18"/>
        {#if showPassword}
            <input type="text" bind:value={password} placeholder="Password" class="{fieldClassNames} bg-transparent outline-0 w-full text-ube placeholder:text-ube placeholder:text-opacity-50 text-left" maxlength="256"/>
        {:else}
            <input type="password" bind:value={password} placeholder="Password" class="{fieldClassNames} bg-transparent outline-0 w-full text-ube placeholder:text-ube placeholder:text-opacity-50 text-left" maxlength="256"/>
        {/if}
    </div>
    <button class="mr-1 text-ube" on:click={() => showPassword = !showPassword}>
        <Icon src={showPassword ? EyeOff : Eye} size="18"/>
    </button>
</div>