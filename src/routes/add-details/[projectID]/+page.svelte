<script>
    import {v4 as uuidv4} from 'uuid'
  import { page } from "$app/stores";
  import { writable } from "svelte/store";
  import { projects } from "../../../lib/store/ProjectStore";

  const projectId = $page.params.projectID;

  let project = {};
  const projectMembers = writable([]);
  let projMember = "";
  let work = "";


  projects.subscribe((lists) => {
    project = lists.find((item) => item.id === projectId);
  });

  function addMember() {
    projectMembers.update(members => [...members, {id: uuidv4() ,name :projMember, work }]);
    projMember = "";
    work = ''
  }

  
  $: console.log($projectMembers);

</script>

<div class="home">
  {#if project}
    <h1 class="text-center my-3" style="color: #62ffff;">
      <b>More Details</b>
    </h1>
    <form>
      <div class="my-5">
        <div class="row">
          <div class="col-6">
            <b>Project Budget</b>
            <input type="text" class="form-control bg-dark" />
          </div>
          <div class="col-6">
            <b>Project Owner</b>
            <input type="text" class="form-control bg-dark" />
          </div>
          <div class="my-4">
            <b class="">Project Members</b>
            <div class="d-flex">
              <input
                type="text"
                on:change={(e) => (projMember = e.target.value)}
                value={projMember}
                class="form-control bg-dark w-25"
                placeholder='Member Name'
              />
              <input
                type="text"
                on:change={(e) => (work = e.target.value)}
                value={work}
                class="form-control bg-dark w-50 mx-2"
                placeholder='Assigned work'
              />
              <button class="btn btn-primary mx-1" on:click={addMember}
                >Add Members</button
              >
            </div>
          </div>
          <ul class="mx-5">
              {#each $projectMembers as projmmbr (projMember.id)}
                <li style="color:white;">{projmmbr.name} : {projmmbr.work}</li>
              {/each}
          </ul>
        </div>
      </div>
    </form>
  {:else}
    <h1>No project found</h1>
  {/if}
</div>

<style>
  .home {
    margin-left: 20vw;
    margin-right: 20vw;
  }
  .form-control {
    color: white;
  }
</style>
