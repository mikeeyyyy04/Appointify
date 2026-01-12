<script lang="ts">
    import {Hospital} from "@steeze-ui/lucide-icons";
    import {Icon} from "@steeze-ui/svelte-icon";
    import type {AlertError} from "@/types";
    import ErrorAlert from "@/components/ErrorAlert.svelte";
    import {token} from "@/stores";
    import ProgrammaticableRedirect from "@/components/ProgrammaticableRedirect.svelte";
    import BackHeader from "@/components/ui/headers/BackHeader.svelte";
    import LoadableButton from "@/components/LoadableButton.svelte";
    import {addNewClinic} from "@/requests/fetchClinic";
    import {goto} from "$app/navigation";

    let clinicName: string = ""

    $: isProperlyFilled = clinicName != ""

    let error: AlertError | null = null
    let loading = false

    async function addClinic() {
        if (loading || !isProperlyFilled) return
        try {
            loading = true
            await addNewClinic($token!, clinicName)
            goto('/clinic', { replaceState: true })
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
            addClinic()// Call addClinic if the Enter key is pressed
        }
    }
</script>

<svelte:window on:keypress={onkeypress}/>
<div class="flex flex-col gap-4 min-h-full w-full">
    <ProgrammaticableRedirect id="_clinic" href="/clinic"/>
    <BackHeader type="a" href="/" textColor="text-ube">Cancel</BackHeader>
    <div class="flex flex-col gap-4 pt-6">
        <div class="flex flex-col w-full gap-4">
            <ErrorAlert error={error} theme="ube"/>
            <h2 class="font-bold text-2xl max-w-xs break-words text-ube">
                Be part of the many clinics using Appointify once again!
            </h2>
            <p>
                It seems like you recently deleted your clinic. Don't worry, you can add your clinic back to
                Appointify again at no cost!
            </p>
            <p>
                Simply write your clinic name at the bottom, and click the button!
            </p>
        </div>
        <div class="flex flex-col">
            <div class="w-full px-4 py-2.5 rounded-3xl bg-zinc-50 border border-mountbatten-pink flex flex-row justify-between items-center gap-4">
                <Icon src={Hospital} size="18"/>
                <input type="text" bind:value={clinicName} placeholder="Clinic Name" class="bg-transparent outline-0 text-ube placeholder:text-ube placeholder:text-opacity-50" maxlength="64"/>
            </div>
        </div>
        <LoadableButton disabled={!isProperlyFilled} on:click={addClinic} bind:loading>Add Clinic</LoadableButton>
    </div>
</div>