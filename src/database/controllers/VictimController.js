const Victim = require('../models/Victim')
const status = require('../../functions/status')

module.exports = class VictimController {
    async Create (owner, data) {
        const newVictim = new Victim({
            owner,
            data
        })

        try {
            const result = await newVictim.save()
            return {
                status: 200,
                message: "Dados salvos com êxito!",
                db: result
            }
        } catch {
            return status.server_error
        }
    }
}