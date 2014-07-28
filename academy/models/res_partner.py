from openerp.osv import orm, fields

class Partner(orm.Model):
    _inherit = 'res.partner'

    _columns = {
        'biography': fields.html(),
    }