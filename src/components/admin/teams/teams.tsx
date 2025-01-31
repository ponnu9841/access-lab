import axiosClient from "@/axios/axios-client";
import NextImage from "@/components/Image";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchTeams, setSelectedTeam } from "@/redux/features/teams-slice";
import { useAppDispatch } from "@/redux/hooks/use-dispatch";
import { useAppSelector } from "@/redux/hooks/use-selector";
import { MdEdit } from "react-icons/md";
import { DeleteDrawer } from "../delete-drawer";

export default function Teams() {
	const dispatch = useAppDispatch();
	const { loading, data } = useAppSelector((state) => state.rootReducer.teams);

	const deleteTeam = async (id: string, image: string) => {
		try {
			const response = await axiosClient.delete(`/teams`, {
				params: { id, image },
			});
			if (response && response.status === 200) {
				dispatch(fetchTeams());
			}
		} catch (error) {
			throw error;
		}
	};
	return (
		<div>
			<h2 className="text-xl">Teams</h2>

			<div className="grid grid-cols-2 gap-6 max-h-[500px] overflow-auto">
				{!loading && data.length === 0 && (
					<div className="col-span-4 text-center mt-3 text-red-500">
						No Record Found
					</div>
				)}
				{loading &&
					Array(4)
						.fill(null)
						.map((_, index) => (
							<Skeleton key={index} className="aspect-square" />
						))}
				{data.map((team) => (
					<div key={team.id}>
						<div className="relative flex justify-center">
							<NextImage
								src={team.image}
								className="aspect-square max-w-[100px]"
							/>
							<Button
								size="icon"
								className="w-8 h-8 absolute bottom-0 right-10"
								onClick={() => dispatch(setSelectedTeam(team))}
							>
								<MdEdit />
							</Button>

							<div className="absolute bottom-0 right-0">
								<DeleteDrawer
									title={`Delete Service ${team.name}`}
									description={`Are you sure you want to delete this Team Member? This action cannot be undone.`}
									onDelete={() => deleteTeam(team.id, team.image)}
								/>
							</div>
						</div>
						<div className="mt-4">
							<span className="font-bold">Name: </span> {team?.name}
						</div>
						<div className="mt-4">
							<span className="font-bold">Designation: </span> {team?.designation}
						</div>
						
					</div>
				))}
			</div>
		</div>
	);
}
