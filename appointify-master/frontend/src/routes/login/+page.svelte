<script lang="ts">
    import {User} from "@steeze-ui/lucide-icons";
    import ErrorAlert from "@/components/ErrorAlert.svelte";
    import type {AlertError} from "@/types";
    import {login} from "@/requests/authenticate";
    import {token} from "@/stores";
    import ProgrammaticableRedirect from "@/components/ProgrammaticableRedirect.svelte";
    import BackHeader from "@/components/ui/headers/BackHeader.svelte";
    import LoadableButton from "@/components/LoadableButton.svelte";
    import InputField from "$lib/components/InputField.svelte";
    import PasswordField from "$lib/components/PasswordField.svelte";

    let username: string = ""
    let password: string = ""

    $: isProperlyFilled = username != "" && password != ""

    let error: AlertError | null = null
    let loading = false

    async function loginAccount() {
        if (loading || !isProperlyFilled) return

        try {
            loading = true
            const response = await login(username, password)

            $token = response.token
            document.getElementById('_clinic')?.click()
        } catch (e) {
            error = {
                title: "An error occurred.",
                description: e?.message ?? "Unknown error."
            }
        } finally {
            loading = false
        }
    }

    function onkeypress(ev: KeyboardEvent) {
        if (ev.key === 'Enter') {
            loginAccount()
        }
    }
</script>

<svelte:window on:keypress={onkeypress}/>
<div class="flex flex-col gap-4 min-h-full w-full">
    <ProgrammaticableRedirect id="_clinic" href="/clinic"/>
    <BackHeader type="a" href="/" textColor="text-ube">Login</BackHeader>
    <div class="flex flex-col gap-4 {error == null ? 'pt-24' : 'pt-6'}">
        <div class="flex flex-col w-full">
            <ErrorAlert error={error} theme="ube"/>
            <h2 class="text-3xl tracking-tight leading-none font-bold text-center text-ube">Log in to manage your</h2>
            <h2 class="text-3xl tracking-tight leading-none font-bold text-center text-ube">clinic with Appointify!</h2>
            <p class="text-sm text-center pt-2 text-mountbatten-pink">Take control of your clinic's schedule and provide better service.</p>
        </div>
        <div class="flex flex-col">
            <InputField icon={User} placeholder="Username" bind:value={username} borderPosition="border-b-0" roundedPosition="rounded-b-none"/>
            <PasswordField classNames="rounded-3xl rounded-t-none rounded-b-3xl" fieldClassNames="pl-1" bind:password/>
        </div>
        <LoadableButton disabled={!isProperlyFilled} on:click={loginAccount} bind:loading>Login</LoadableButton>
        <a href="/register" class="text-xs text-center text-mountbatten-pink">Don't have an account yet, click here to register!</a>
    </div>
</div>