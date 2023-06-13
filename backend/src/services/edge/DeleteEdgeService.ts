
import prismaclient from "../../prisma";

export async function DeleteEdgeService(iduser: string,idarea : string) {
 // Verify if the area belongs to the user
 const area = await prismaclient.nodeArea.findUnique({
    where: {
      id: idarea,
    },
    select: {
      id: true,
      usuarioId: true,
    },
  });
  if (!area) {
    throw new Error('Area not found');
  }
  if (area.usuarioId !== iduser) {
    throw new Error('Area does not belong to the user');
  }
  // Delete the area
  const result = await prismaclient.nodeArea.delete({
    where: {
      id: idarea,
    },
  });

  return result;
}
