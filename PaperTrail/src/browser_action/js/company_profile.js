(function(window, document, undefined) {

  var CompanyProfile = {};

  /* HANDLEBAR TEMPLATE ELEMENTS ------------------------------------------- */
  var $company_template = $('#company-template');

  /* COMPILED HANDLEBAR TEMPLATES ------------------------------------------ */
  var templates = {
    company_template: Handlebars.compile($company_template.html()),
  };

  /* Renders an entry into the given $entry element. Requires the object
   * representing the active entry (activeEntryData). If this object is null,
   * picks the first existing entry. If no entry exists, this view will display
   * the CreatingEntryView. */
  CompanyProfile.render = function() {
    $('#test1').html('hiiii');
  };

  window.EntryView = EntryView;

})(this, this.document);
