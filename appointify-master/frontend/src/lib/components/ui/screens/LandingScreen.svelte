<script lang="ts">
    import {Button} from "@/components/ui/button";
    import { fade } from "svelte/transition"
    import ProgrammaticableRedirect from "@/components/ProgrammaticableRedirect.svelte";

    function openAppointmentTracker() {
        document.getElementById('_clinics')?.click()
    }

    function openLoginPage() {
        document.getElementById('_login')?.click()
    }
</script>

<div class="flex flex-col gap-4 min-h-full pt-12">
    <ProgrammaticableRedirect id="_login" href="/login"/>
    <ProgrammaticableRedirect id="_clinics" href="/clinics"/>
    <h2 class="font-bold text-4xl max-w-xs break-words text-ube" in:fade={{ duration: 750 }}>
        Track your appointments easier.
    </h2>
    <p in:fade={{ duration: 750, delay: 900 }}>
        Stop wasting time in the waiting room.
        Appointify lets you see exactly how many people are ahead of you at the clinic,
        so you can plan your arrival and minimize your wait.
    </p>
    <div class="fixed bottom-0 left-0 w-full py-6 px-5" in:fade={{ duration: 500, delay: 1_500 }}>
        <div class="flex flex-col gap-2 flex-grow">
            <Button class="h-12 bg-ube" on:click={openAppointmentTracker}>Track your appointment</Button>
            <Button class="h-12" variant="secondary" on:click={openLoginPage}>Manage your clinic</Button>
        </div>
    </div>
</div>