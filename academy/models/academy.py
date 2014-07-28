# -*- coding: utf-8 -*-
from openerp.osv import orm, fields

class TeachingAssistants(orm.Model):
    _name = "academy.tas"

    _columns = {
        'name': fields.char(),
        'biography': fields.html(),
    }

class Lectures(orm.Model):
    _name = 'academy.lectures'
    _order = 'date ASC'

    _columns = {
        'name': fields.char(required=True, string="Name"),
        'date': fields.date(required=True, string="Date"),
    }