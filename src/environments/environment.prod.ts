export const environment = {
	production: true,
	assert: "../BPMSoft.Configuration/Pkg/BPMSoft_NgExample/Files/src/js/ng-component/assets",
	todoService: {
		getList: "../rest/ActivityService/GetActivities?ownerId={0}",
		getStatuses: "../rest/ActivityService/GetStatuses",
		addRecord: "../rest/ActivityService/AddActivity",
		checkRecord: "../rest/ActivityService/CheckRecord",
	}
};
