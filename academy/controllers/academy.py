# -*- coding: utf-8 -*-

from openerp import http
from openerp.addons.web.controllers import main

class academy(http.Controller):
    @http.route('/academy', auth='public', website=True)
    def index(self):
        registry = http.request.registry
        cr, uid, context = http.request.cr, http.request.uid, http.request.context

        Data = registry['ir.model.data']
        _, ta_group_id = Data.get_object_reference(cr, uid, 'academy', 'tas')
        tas = registry['res.users'].search_read(
            http.request.cr, http.request.uid,
            [('groups_id', '=', [ta_group_id])],
            context=http.request.context)

        Lectures = registry['event.event']
        _, lecture_type_id = Data.get_object_reference(cr, uid, 'academy', 'lecture_type')
        lectures = Lectures.browse(
            cr, uid,
            Lectures.search(cr, uid, [('type', '=', lecture_type_id),], context=context),
            context=context)

        return http.request.website.render('academy.index', {
            'tas': tas,
            'lectures': lectures,
        })

    @http.route('/tas/<model("res.users"):ta>/', auth='public', website=True)
    def ta(self, ta):
        return http.request.website.render('academy.ta', {
            'ta': ta,
        })