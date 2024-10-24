export const environment = {
	production: true,
	assert: "../BPMSoft.Configuration/Pkg/BPMSoft_NgExample/Files/src/js/ng-todo/assets",
	todoService: {
		getRecord: "../rest/ActivityService/GetRecord?activityId={0}",
		getRecords: "../rest/ActivityService/GetRecords?ownerId={0}",
		getStatuses: "../rest/ActivityService/GetStatuses",
		addRecord: "../rest/ActivityService/AddRecord",
		checkRecord: "../rest/ActivityService/CheckRecord",
	}
};
