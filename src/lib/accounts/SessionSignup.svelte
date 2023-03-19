<script>
import Button from './../ui/Button.svelte'

</script>
<div class="flex md:justify-end max-w-xl mx-auto flex-col">
    <div
        class=" flex flex-col bg-white dark:text-white dark:bg-slate-800 mx-3 mt-32 border-2  h-72 "
    >
        <div
            class="flex flex-row text-center justify-around p-4 mx-auto h-full w-11/12  "
        >
            <div class=" h-1/2 w-5/12  my-auto  ">
                <Button>Page Signup</Button>
            </div>
            <div class=" h-1/2 w-5/12  my-auto ">
            <div class="border-2"></div>
            <button class="active:bg-rose-600 bg-rose-500 text-white sm:w-32  px-2 h-10  rounded-lg shadow 
     outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-100"
        type="button">Profile Signup</button>
            </div>
        </div>
    </div>
</div>
