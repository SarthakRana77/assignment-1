const Agencies = require('../model/agencies_clients');

exports.maxCli =  (req, res, next) => {

    Agencies.aggregate([
      {
        $unwind: "$clients"
      },
      {
        $group: {
          _id: {
            agencyId: "$_id",
            agencyName: "$agencyName"
          },
          totalBill: {
            $sum: {
              $toInt: "$clients.bill"
            }
          },
          topClients: {
            $push: {
              name: "$clients.name",
              email: "$clients.email",
              number: "$clients.number",
              bill: "$clients.bill"
            }
          }
        }
      },
      {
        $sort: {
          totalBill: -1
        }
      },
      {
        $limit: 1
      }
    ]).then((err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({
          error: err
        });
      } else {
        const agency = result[0];
        console.log({
          AgencyName: agency._id.agencyName,
          TopClients: agency.topClients,
          TotalBill: agency.totalBill
        });
        res.status(200).json({
          AgencyName: agency._id.agencyName,
          TopClients: agency.topClients,
          TotalBill: agency.totalBill
        });
      }
    });
  };

