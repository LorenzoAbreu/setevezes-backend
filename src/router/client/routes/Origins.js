const router = require("express").Router();
const OriginController = require("../../../database/controllers/OriginController");
const status = require("../../../functions/status");
const Origin = new OriginController();
const json = require("../../../functions/json");

router
    .route("/client/origins")
    .get(async (req, res) => {
        try {
            console.log(req._username);
            const result = await Origin.GetAll(req._username);
            return res.json({
                status: 200,
                data: result || [],
            });
        } catch {
            return res.json(status.server_error);
        }
    })
    .post(async (req, res) => {
        const { title, url, options } = req.body;

        const pg1 = options.pgbrasil;
        const pg2 = options.pgcelular;
        const pg3 = options.pgsegura;
        const pg4 = options.pgautocapture;

        const pg5 = json.parse(options.pgredirect);

        if (
            (pg1 != true && pg1 != false) ||
            (pg2 != true && pg2 != false) ||
            (pg3 != true && pg3 != false) ||
            (pg4 != true && pg4 != false) ||
            (pg5 != true && pg5 != false)
        ) {
            console.log("TÁ FALTANDO AS OPTIONS");
            return res.json(status.fill_all_fields);
        }

        console.log("[create] BODY", req.body);

        if (!req._username) return res.json(status.user_not_found);

        Origin.Create(req._username, title, url, options)
            .then((result) => {
                return res.json(result);
            })
            .catch((e) => {
                console.log("ERRO:", e);
                return res.json(status.server_error);
            });
    })
    .put((req, res) => {
        const { id, url, title, newUrl, options } = req.body;
        console.log({
            url,
            newUrl,
        });

        const pg1 = options.pgbrasil;
        const pg2 = options.pgcelular;
        const pg3 = options.pgsegura;
        const pg4 = options.pgautocapture;

        const pg5 = options.pgredirect_on;
        const pg6 = options.pgredirect_url;

        if (
            (pg1 !== true && pg1 !== false) ||
            (pg2 !== true && pg2 !== false) ||
            (pg3 !== true && pg3 !== false) ||
            (pg4 !== true && pg4 !== false) ||
            (pg5 != true && pg5 != false)
        ) {
            console.log("TÁ FALTANDO AS OPTIONS");
            return res.json(status.fill_all_fields);
        }

        console.log(req.body);

        if (!req._username) return res.json(status.user_not_found);

        Origin.Edit(req._username, id, url, title, newUrl, options)
            .then((r) => {
                return res.json(r);
            })
            .catch((e) => {
                console.log(e);
                return res.json(status.server_error);
            });
    })
    .delete((req, res) => {
        const { id } = req.query;
        const username = req._username;

        console.log(req.query);

        Origin.Delete(username, id)
            .then((r) => {
                console.log(r);
                return res.json(r);
            })
            .catch((e) => {
                console.log(e);
                return res.json(status.server_error);
            });
    });

module.exports = router;
