import { LightningElement, track } from 'lwc';
import syncRepositories from '@salesforce/apex/GitHubController.syncRepositories';

export default class SyncGitHub extends LightningElement {
    @track orgOrUser = '';
    @track isLoading = false;
    @track message = '';

    handleInput(event) {
        this.orgOrUser = event.target.value;
    }
//HIEEEEEEEEE
    async handleSync() {
        this.isLoading = true;
        this.message = '';
        try {
            await syncRepositories({ orgOrUser: this.orgOrUser });
            this.message = 'Repositories synced successfully!';
        } catch (error) {
            console.error(error);
            this.message = 'Error syncing repositories.';
        } finally {
            this.isLoading = false;
        }
    }
}