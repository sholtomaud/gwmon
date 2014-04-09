module.exports = function(app){
    var views = app.views,
        actions = app.actions,
        behaviours = app.behaviours;

    function createFormTemplate(){
        var selectedForm = new views.List();

        var formTemplate = new views.Container(),
            fieldTextbox = new views.Textbox(),
            fieldLabel = new views.Label(),
            datePlaceholder = new Date();

        fieldLabel.text.binding = '[label]';
        fieldLabel.classes.value = 'labels';

        fieldTextbox.subType.binding = '[type]';
        fieldTextbox.required.binding = '(? (== [required] "true") "required")';
        fieldTextbox.maxLength.binding = '[maxlength]';
        fieldTextbox.placeholder.binding = '[placeholder]';
       // fieldTextbox.value.binding = '(? (== [/ui/table_field] [/data/record/table_field]) [/data/record/value])';
        //     toggleAllCheckbox.actions.change = [toggleAll];
        //fieldTextbox.value.binding = '(map (filter [/ui] {item (== item.table_field [/data])}) {item item.value})';
        fieldTextbox.disabled.binding = '[/fieldsEnabled]';

        formTemplate.views.content.add([
            fieldLabel,
            fieldTextbox
        ]);

        formTemplate.classes.value = 'fields';



        return formTemplate;

    }

    function createDataEntryForm(){
        var addForm = new views.Form(),
            addTextBox = new views.Textbox(),
            fieldList = new views.List();

        fieldList.list.template = createFormTemplate();
        fieldList.list.binding = '[/ui]'; //in gaffa the [] within a string represents a binding to the model (bindings in gaffa are all Gel expressiosn)

        //fieldList.classes.value = 'form';
        //fieldList.enabled.binding = '[/fieldsEnabled]';

    /*
        addForm.enabled.binding = '[/fieldsEnabled]';
        var model = {
        data:[
            {a:1,b:2},
            {a:3,b:4}
                etc....
        ],
        fieldsEnabled: true
    };

    */
        addForm.views.content.add([
            fieldList
        ]);
        addForm.classes.value = 'formContainer';


        return addForm;
    }



    // Make the apps UI
    function createHeader(){
      var headerTemplate = new views.Container(),
        header = new views.Header();

        header.text.value = 'Ground Water Bores Data Forms';

        headerTemplate.views.content.add([
          header
        ]);

        return headerTemplate;
    }


    // Make the app footer
    function stickyFooter(){
      var footerTemplate = new views.Container(),
        banner = new views.Image(),
        footer = new views.Textbox();

        banner.source.value = 'images/chromicon_logo_small.png';

        footerTemplate.views.content.add([
          banner
        ]);

        footerTemplate.classes.value = 'footer';
        return footerTemplate;
    }

    // Make the apps UI
    function createControls(){

        var controlsTemplate = new views.Container(),
            backButton = new views.Button(),
            newRecordButton = new views.Button(),
            editRecordButton = new views.Button(),
            cancelButton = new views.Button(),
            saveRecordButton = new views.Button(),
            nextButton = new views.Button(),
            searchBox = new views.Textbox(),
            deleteRecordButton = new views.Button(),
            enableForm = new actions.Set(),
            disableForm = new actions.Set(),
            addNewRecord = new actions.Push(),
            saveRecord = new actions.Set(),
            addRecordIfNotEmpty = new actions.Conditional(),
            clearNewRecord = new actions.Remove();


        backButton.text.value = '<- Back';
        newRecordButton.text.value = 'New Record';
        editRecordButton.text.value = 'Edit';
        cancelButton.text.value = 'Cancel';
        saveRecordButton.text.value = 'Save';
        nextButton.text.value = 'Next ->';
        searchBox.placeholder.value = 'Search...';
        deleteRecordButton.text.value = 'Delete';

        enableForm.source.value = 'true' ;
        disableForm.source.value = 'false' ;
        enableForm.target.binding = '[/fieldsEnabled]';
        disableForm.target.binding = '[/fieldsEnabled]';

        editRecordButton.actions.click = [enableForm];
        newRecordButton.actions.click = [enableForm];
        /*
        var todosInViewBinding = '(?
                (= [/filter] "all") [/todos]
                    (?
                        (= [/filter] "completed")
                        (filter [/todos] {todo todo.completed})
                        (filter [/todos] {todo (! todo.completed)}
                        )
                    )
                )';

         var tab = new views.Container();

        tab.classes.binding = '(join " " "tab" (? (= [tabs/selectedTab] "' + tabName + '") "selected"))';


        */
        //toggleAll.target.binding = '(map' + todosInViewBinding + '{todo todo.completed})';
        //addTodo.source.binding = '(object "label" [])';
        // (join "" "Clear completed (" (filter [] {todo todo.completed}).length ")")

        saveRecord.source.binding = '(object "record" (? (filter [] {fields fields.value}) (filter [/ui] {fields fields.table_field}) ) )';
        //saveRecord.target.binding = '[/data]';
        saveRecord.target.binding = '[/data]';

        cancelButton.actions.click = [disableForm];
        saveRecordButton.actions.click = [disableForm,saveRecord];

        //clearNewData = new actions.Remove();

        //addNewRecord.source.binding = '(object [ui] [ui])';
        //addNewRecord.target.binding = '[/data]';

        controlsTemplate.views.content.add([
            newRecordButton,
            editRecordButton,
            saveRecordButton,
            backButton,
            nextButton,
            cancelButton,
            searchBox,
            deleteRecordButton
        ]);

        controlsTemplate.classes.value = 'controls';
        return controlsTemplate;

    }

    // Make the apps UI
    function createFormView(){
        var appWrapper = new views.Container();

        appWrapper.views.content.add([
            //createHeader(),
            createControls(),
            createDataEntryForm()
        ]);
        appWrapper.classes.value = 'app'
        return appWrapper;
    }

    function createAppBehaviours(){
        var onLoadBehaviour = new behaviours.PageLoad(),
            retieveLocalData = new actions.BrowserStorage(),
            persistDataOnChange = new behaviours.ModelChange(),
            persistData = new actions.BrowserStorage(),
            active = new actions.Set(),
            updateDisabled = new actions.Set(),
            setActiveRecord = new actions.Set(),
            ttoggleDisabled = new behaviours.ModelChange();

        updateDisabled.source.binding = '[/fieldsEnabled]';
        updateDisabled.target.binding = '[]';

        ttoggleDisabled.watch.binding = '[/fieldsEnabled]';
        ttoggleDisabled.actions.change = [updateDisabled];

        active.source.value = 0;
        active.target.value = '[/activeNo]';

        retieveLocalData.source.value = 'data';
        retieveLocalData.method.value = 'get';
        retieveLocalData.target.binding = '[/data]';

        onLoadBehaviour.actions.load = [retieveLocalData];

        persistData.source.binding = '[/data]';
        persistData.method.value = 'set';
        persistData.target.value = 'data';

        persistDataOnChange.watch.binding = '[/data]';
        persistDataOnChange.actions.change = [persistData];

        return [
            onLoadBehaviour,
            persistDataOnChange
        ];
    }

    function createView(){
        var appView = new views.Container();

        appView.views.content.add([
            //createHeader(),
            createFormView(),
            stickyFooter()
        ]);

        appView.classes.value = 'app';
        appView.behaviours = createAppBehaviours();

        return appView;
    }

    return createView;
};