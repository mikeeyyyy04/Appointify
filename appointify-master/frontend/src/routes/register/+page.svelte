<script lang="ts">
    import {Hospital, User} from "@steeze-ui/lucide-icons";
    import {register} from "@/requests/authenticate";
    import type {AlertError} from "@/types";
    import ErrorAlert from "@/components/ErrorAlert.svelte";
    import {token} from "@/stores";
    import ProgrammaticableRedirect from "@/components/ProgrammaticableRedirect.svelte";
    import BackHeader from "@/components/ui/headers/BackHeader.svelte";
    import LoadableButton from "@/components/LoadableButton.svelte";
    import InputField from "$lib/components/InputField.svelte";
    import PasswordField from "$lib/components/PasswordField.svelte";

    let showPassword = false

    let username: string = ""
    let password: string = ""
    let clinicName: string = ""

    $: isProperlyFilled = username != "" && password != "" && clinicName != ""

    let error: AlertError | null = null
    let loading = false

    async function registerAccount() {
        if (loading || !isProperlyFilled) return
        try {
            loading = true
            const response = await register(username, password, clinicName)

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
            registerAccount()
        }
    }
</script>

<svelte:window on:keypress={onkeypress}/>
<div class="flex flex-col gap-4 min-h-full w-full">
    <ProgrammaticableRedirect id="_clinic" href="/clinic"/>
    <BackHeader type="a" href="/" textColor="text-ube">Register</BackHeader>
    <div class="flex flex-col gap-4 {error == null ? 'pt-24' : 'pt-6'}">
        <div class="flex flex-col w-full">
            <ErrorAlert error={error} theme="ube"/>
            <h2 class="text-3xl tracking-tight leading-none font-bold text-center text-ube">Join many other clinics</h2>
            <h2 class="text-3xl tracking-tight leading-none font-bold text-center text-ube">in using Appointify!</h2>
            <p class="text-sm text-center pt-2 text-mountbatten-pink">Take control of your clinic's schedule and provide better service.</p>
        </div>
        <div class="flex flex-col">
            <InputField icon={User} placeholder="Username" bind:value={username} borderPosition="border-b-0" roundedPosition="rounded-b-none"/>
            <PasswordField bind:password/>
            <InputField icon={Hospital} placeholder="Clinic Name" bind:value={clinicName} borderPosition="border-t-0" roundedPosition="rounded-t-none"/>
        </div>
        <LoadableButton disabled={!isProperlyFilled} on:click={registerAccount} bind:loading>Register</LoadableButton>
        <a href="/login" class="text-xs text-center text-mountbatten-pink">Already have an account, login now!</a>
    </div>
</div>