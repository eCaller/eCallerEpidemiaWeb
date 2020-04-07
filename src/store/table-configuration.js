/*
Copyright 2020, Ingenia, S.A.
This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details.

@author jfpastor@ingenia.es
*/
export default {
  css: {
    table: {
      tableClass: 'table table-striped table-bordered table-hovered',
      loadingClass: 'loading',
      ascendingIcon: 'glyphicon glyphicon-chevron-up',
      descendingIcon: 'glyphicon glyphicon-chevron-down',
      handleIcon: 'glyphicon glyphicon-menu-hamburger',
      detailRowClass: 'vuetable-detail-row',
    },
    pagination: {
      infoClass: 'pull-left',
      wrapperClass: 'vuetable-pagination pull-right',
      activeClass: 'btn-primary',
      disabledClass: 'disabled',
      pageClass: 'btn btn-border',
      linkClass: 'btn btn-border',
      icons: {
        first: '',
        prev: '',
        next: '',
        last: '',
      },
    }
  }
}
