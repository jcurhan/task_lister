To do items:
1. Delete/Edit
2. Frontend (Bootstrap)
3. Add navigation
4. Update Create Board action to redirect to board#show
5. Stretch Goals: create users/sessions
6. Stretch Goals: add associations between JS models
7. Add some Rails model analytics
8. Allow users to sort tasks by priority (currently on refresh, list sorts, but otherwise prepends in order of creation)
9. Character counter for task description (bonus: green to orange to red once over char limit)


New:
1. Use Search box in nav bar to find other boards (use a listener to make ajax calls on key-up events to auto populate a dropdown with matching search results, querying the database for matches)
2. for search results, on "hover"(like on click) toggleclass to add 'active'
3. Make search results drop down independent of nav bar

Edit:
1. When edit is clicked, include a pop-up modal, ajax call to update in tasks controller (currently passes through IDs, need to pass through as data the updated task info), if save, then update the javascript on the page (without refresh)


Tests:
-write tests (model and feature)