import prisma from "../db"

export const getUpdate = async (req: any, res: any) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.json({data: update})
}

export const getUpdates = async (req: any, res: any) => {

    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allupdates: any, product: any) => {
        return [...allupdates, ...product.updates]
    }, [])

    res.json({data: products.map(p => updates)})
}

export const createUpdate = async (req: any, res: any) => {
    
    const product = await prisma.product.findUnique({
        where: {
            id: req.body.productId
        }
    })

    if (!product) return res.json({message: 'nope'});
    
    const update = await prisma.update.create({
        data: {
            title: req.body.title,
            body: req.body.body,
            product: {connect: {id: product.id}}
        }
    })

    res.json({data: update});
}

export const updateUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id,
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allupdates: any, product: any) => {
        return [...allupdates, ...product.updates]
    }, []);

    const match = updates.find(update => update.id === req.params.id);

    if (!match) return res.json({message: 'nope'});

    const updatedUpdate = await prisma.update.update({
        where: {
            id: req.params.id
        },
        data: req.body
    })

    res.json({data: updateUpdate})
}

export const deleteUpdate = async (req: any, res: any) => {
    const products = await prisma.product.findMany({
        where: {
          belongsToId: req.user.id,
        },
        include: {
          updates: true
        }
      })
    
      const updates = products.reduce((allUpdates: any, product) => {
        return [...allUpdates, ...product.updates]
      }, [])
    
      const match = updates.find((update: any) => update.id === req.params.id)
    
      if (!match) {
        // handle this
        return res.json({message: 'nope'})
      }
    
      const deleted = await prisma.update.delete({
        where: {
          id: req.params.id
        }
      })
    
      res.json({data: deleted})
}
